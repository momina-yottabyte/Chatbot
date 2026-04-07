export const intents = [
  {
    name: 'greetings',
    examples: ['hi', 'hello', 'hey', 'good morning'],
    response: 'Hello! How can I assist you with HRMS today?',
  },
{
  name: 'leave_request',
  examples: [
    'apply for leave',        // ← shorter core phrase catches more variations
    'request leave',
    'requesting time off',
    'take leave',
    'time off request',
  ],
  response: 'Sure! You can apply for leave in the Leave section of HRMS dashboard.',
},
  {
    name: 'attendance_checkin',
    examples: [
      'I want to check in',
      'how to mark attendance?',
      'check in today',
    ],
    response: 'You can check in using the Check-In button on your HRMS dashboard.',
  },
];