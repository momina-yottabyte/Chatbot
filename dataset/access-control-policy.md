# Access Control Policy

## Overview

This policy ensures that access to YOTTABYTE information systems is properly controlled, authorized, and aligned with user roles and responsibilities. It protects the confidentiality, integrity, and availability of company data.

---

## Purpose

The purpose of this policy is to ensure that users and system entities have appropriate and authorized access to YOTTABYTE information systems based on their roles.

---

## Scope

This policy applies to:

- All employees
- Contractors and third parties
- All systems, processes, and applications within YOTTABYTE

---

## Access Control Principles

- Access is granted only to authorized users
- Principle of **least privilege** must be followed
- Access is granted on a **need-to-know basis**
- Systems must be protected from unauthorized access
- Network access must be restricted and monitored

---

## User Access Management

- A formal process must be followed for:
  - User onboarding
  - Access updates
  - Offboarding
- Each user must have a **unique user ID**
- Access must be approved by the user’s manager
- Users must change passwords on first login
- Passwords must be securely stored and transmitted
- Access must be removed when no longer needed
- Role-based access control (RBAC) should be applied
- Access must be revoked immediately after termination

---

## Privileged Accounts

- Granted only when required for job responsibilities
- Must be linked to a specific individual
- Must use **multi-factor authentication (MFA)**
- Must be revoked when no longer needed
- Regular reviews of privileged access are required
- Security incidents involving privileged accounts must be handled immediately

---

## Generic / Shared Accounts

- Not allowed unless approved for business reasons
- Must have:
  - Assigned owner
  - Defined purpose
  - List of users
  - Duration of usage
- Passwords must be reset when access changes
- Must be reviewed annually

---

## Remote Access

- Must be securely authenticated (password + optional MFA)
- Data must be encrypted over public networks
- Privileged remote access must be restricted and monitored
- Logs must be reviewed regularly
- VPN must be used for secure access
- Users must not bypass remote access security controls

---

## Application Accounts

- Must have defined ownership and purpose
- Access must be based on user roles
- Production data access must be restricted
- Access to systems like HRMS must follow role permissions
- Database access must be strictly controlled
- VPN required for database connections

---

## Local Administrator Access

- Must be strictly controlled
- Requires valid business justification
- Provides full system-level control, so must be limited

---

## Secure Logon Procedures

- Each user must have a unique login ID
- Account lockout after:
  - 10 failed attempts
- Lockout duration:
  - 30 minutes
- Session timeout:
  - 15 minutes of inactivity

---

## Password Management

Passwords must follow these rules:

- Length: 8–14 characters
- Must include:
  - Uppercase and lowercase letters
  - Numbers
  - Special characters (e.g., %, #)
- Maximum password age:
  - 180 days
- Minimum password reuse restriction:
  - Last 5 passwords cannot be reused

---

## Annual Review

- Policy is reviewed annually or when required
- Internal audits are conducted yearly
- Processes are updated to stay compliant

---

## References

- ISO/IEC 27001:2022  
  (Clauses A.5.15 – A.5.18, A.8.2, A.8.3)