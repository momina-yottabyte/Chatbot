import { Injectable, Logger } from '@nestjs/common';

export interface GuardrailResult {
  allowed: boolean;
  reason?: string;
}

@Injectable()
export class GuardrailsService {
  private readonly logger = new Logger(GuardrailsService.name);

  // ─── Tuneable constants ───────────────────────────────────────────────────
  private readonly MAX_INPUT_LENGTH = 1000;
  private readonly MIN_INPUT_LENGTH = 2;

  /**
   * Phrases that indicate an attempt to override the system prompt
   * or jailbreak the assistant.
   */
  private readonly INJECTION_PATTERNS: RegExp[] = [
    /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
    /disregard\s+(your\s+)?(system\s+)?prompt/i,
    /you\s+are\s+now\s+(a\s+)?(?!an?\s+hrms)/i,
    /act\s+as\s+(?!an?\s+hrms)/i,
    /pretend\s+(you\s+are|to\s+be)/i,
    /forget\s+(everything|all|your|the)\s+/i,
    /new\s+persona/i,
    /DAN\b/,                          // "Do Anything Now" jailbreak
    /\[\s*system\s*\]/i,              // fake system tags
    /<\s*system\s*>/i,
  ];

  /**
   * Keywords that are clearly within HRMS scope.
   * A message hitting ANY of these passes the topic check.
   */
  private readonly HRMS_KEYWORDS: RegExp[] = [
    /\b(employee|staff|worker|personnel)\b/i,
    /\b(leave|vacation|time.?off|pto|sick.?day)\b/i,
    /\b(payroll|salary|pay(slip|stub|check)?|compensation|bonus)\b/i,
    /\b(attendance|check.?in|check.?out|clock.?(in|out))\b/i,
    /\b(performance|appraisal|review|kpi|goal)\b/i,
    /\b(recruit|hiring|onboard|offboard|job\s+post)\b/i,
    /\b(department|team|manager|report(s\s+to)?)\b/i,
    /\b(hrms|hr\s+system|human\s+resource)\b/i,
    /\b(policy|policies|handbook|compliance)\b/i,
    /\b(training|learning|course|certification)\b/i,
    /\b(expense|reimbursement|claim)\b/i,
    /\b(shift|schedule|roster|timetable)\b/i,
    /\b(resignation|termination|exit\s+interview)\b/i,
    /\b(profile|account|login|password|access)\b/i,
    /\b(report|dashboard|analytics|export)\b/i,
  ];

  /**
   * Short conversational messages that are harmless
   * and should pass even without an HRMS keyword.
   */
  private readonly SMALL_TALK_PATTERNS: RegExp[] = [
    /^(hi|hello|hey|good\s+(morning|afternoon|evening)|howdy)[!.,?]?\s*$/i,
    /^(thanks?|thank\s+you|thx|cheers)[!.,?]?\s*$/i,
    /^(bye|goodbye|see\s+you)[!.,?]?\s*$/i,
    /^(ok|okay|got\s+it|understood|sure|great)[!.,?]?\s*$/i,
    /^(yes|no|yep|nope|yup)[!.,?]?\s*$/i,
    /^what\s+(can\s+you\s+do|do\s+you\s+do|are\s+you)[?]?\s*$/i,
    /^help[!.,?]?\s*$/i,
  ];

  /**
   * Patterns used to redact sensitive data from LLM output
   * before it reaches the client.
   */
  private readonly PII_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
    {
      pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/gi,
      label: '[EMAIL REDACTED]',
    },
    {
      // Pakistan / generic phone numbers  e.g. +92 300 1234567 / 0300-1234567
      pattern: /(\+?\d[\d\s\-().]{7,}\d)/g,
      label: '[PHONE REDACTED]',
    },
    {
      // CNIC-style numbers  XXXXX-XXXXXXX-X
      pattern: /\b\d{5}-\d{7}-\d\b/g,
      label: '[ID REDACTED]',
    },
    {
      // Anything that looks like a bank or card number (13-19 consecutive digits)
      pattern: /\b\d{13,19}\b/g,
      label: '[NUMBER REDACTED]',
    },
  ];

  // ─── Public API ───────────────────────────────────────────────────────────

  /**
   * Run all INPUT guardrails in order.
   * Returns the first failing check; returns allowed=true if all pass.
   */
  validateInput(message: string): GuardrailResult {
    const checks = [
      () => this.checkLength(message),
      () => this.checkEncoding(message),
      () => this.checkInjection(message),
      () => this.checkTopicRelevance(message),
    ];

    for (const check of checks) {
      const result = check();
      if (!result.allowed) {
        this.logger.warn(`Input blocked — ${result.reason}`);
        return result;
      }
    }

    return { allowed: true };
  }

  /**
   * Sanitise the LLM's OUTPUT before sending to the client.
   * Redacts PII and enforces a sane response length.
   */
  filterOutput(response: string): string {
    let filtered = response;

    for (const { pattern, label } of this.PII_PATTERNS) {
      filtered = filtered.replace(pattern, label);
    }

    // Hard-cap response length (very large outputs are unusual for HRMS)
    const MAX_OUTPUT_CHARS = 4000;
    if (filtered.length > MAX_OUTPUT_CHARS) {
      filtered =
        filtered.slice(0, MAX_OUTPUT_CHARS) +
        '\n\n[Response truncated. Please ask a more specific question.]';
    }

    return filtered;
  }

  // ─── Private checks ───────────────────────────────────────────────────────

  private checkLength(message: string): GuardrailResult {
    if (message.length < this.MIN_INPUT_LENGTH) {
      return { allowed: false, reason: 'Message too short' };
    }
    if (message.length > this.MAX_INPUT_LENGTH) {
      return {
        allowed: false,
        reason: `Message exceeds ${this.MAX_INPUT_LENGTH} character limit`,
      };
    }
    return { allowed: true };
  }

  private checkEncoding(message: string): GuardrailResult {
    // Reject messages that are >60 % non-printable / control characters
    // (likely binary data or intentional garbage)
    const nonPrintable = (message.match(/[\x00-\x08\x0E-\x1F\x7F]/g) ?? [])
      .length;
    if (nonPrintable / message.length > 0.6) {
      return { allowed: false, reason: 'Message contains excessive non-printable characters' };
    }
    return { allowed: true };
  }

  private checkInjection(message: string): GuardrailResult {
    for (const pattern of this.INJECTION_PATTERNS) {
      if (pattern.test(message)) {
        return {
          allowed: false,
          reason: 'Potential prompt injection attempt detected',
        };
      }
    }
    return { allowed: true };
  }

  private checkTopicRelevance(message: string): GuardrailResult {
    // Short greetings / small-talk are always allowed
    for (const pattern of this.SMALL_TALK_PATTERNS) {
      if (pattern.test(message.trim())) {
        return { allowed: true };
      }
    }

    // Pass if any HRMS keyword is present
    for (const pattern of this.HRMS_KEYWORDS) {
      if (pattern.test(message)) {
        return { allowed: true };
      }
    }

    // Short questions (<= 8 words) get the benefit of the doubt —
    // the RAG step will return nothing useful if truly off-topic.
    const wordCount = message.trim().split(/\s+/).length;
    if (wordCount <= 8) {
      return { allowed: true };
    }

    return {
      allowed: false,
      reason: 'Message does not appear to be related to HRMS topics',
    };
  }
}