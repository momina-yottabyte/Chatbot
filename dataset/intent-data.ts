export const intents = [
  {
    name: 'greeting',
    examples: ['hi', 'hello', 'hey', 'good morning'],
    response: 'Hello! How can I assist you with HRMS today?',
  },
  {
    name: 'leave_request',
    examples: [
      'I want to apply for leave',
      'how do I apply for leave?',
      'requesting time off',
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