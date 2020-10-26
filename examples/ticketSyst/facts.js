exports.facts = [
  // HR, overdue
  {
    id: 1,
    topic: 'Benefits',
    type: 'HR Request',
    overdue: true,
    severity: 'medium'
  },

  // IT, default assignment
  {
    id: 2,
    topic: 'Password Reset',
    type: 'IT Request',
    overdue: false,
    severity: 'low'
  },

  // IT, re-assignment, increased severity
  {
    id: 3,
    topic: 'System Outage',
    type: 'IT Request',
    overdue: false,
    severity: 'low'
  },
]
