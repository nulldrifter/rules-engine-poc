exports.systemRules = [
  // send alert if overdue
  {
    conditions: {
      all: [{
        fact: 'overdue',
        operator: 'equal',
        value: true
      }]
    },
    event: {
      type: 'overdue',
      params: {
        message: 'An email has been sent.'
      },
    },
    name: 'Overdue Ticket Alert',
    priority: 10,
    onSuccess(event, almanac) {
      almanac.factValue('id').then(id => {
        console.log(`Ticket #${id} is overdue -> sending email.`)
      })
    },
  },

  // assign to a team based on ticket type
  {
    conditions: {
      all: [{
        fact: 'type',
        operator: 'equal',
        value: 'HR Request'
      }]
    },
    event: {
      type: 'assignment',
      params: {
        assignee: 'human.resources@example.com',
        message: 'The ticket has been assigned.',
      },
    },
    name: 'Ticket Assignment',
    priority: 10,
  },
  {
    conditions: {
      all: [{
        fact: 'type',
        operator: 'equal',
        value: 'IT Request'
      }]
    },
    event: {
      type: 'assignment',
      params: {
        assignee: 'it@example.com',
        message: 'The ticket has been assigned.',
      },
    },
    name: 'Ticket Assignment',
    priority: 10,
  },
]


exports.departmentRules = [
  // IT wants the severity of some inquiries increased and re-assigned
  {
    conditions: {
      all: [{
        fact: 'topic',
        operator: 'equal',
        value: 'System Outage'
      }]
    },
    event: {
      type: 'outage',
      params: {
        assignee: 'production.support@example.com',
        message: 'The ticket has been re-assigned and its severity increased.',
        severity: 'severe',
      },
    },
    name: 'Production Failure',
    priority: 5,
  },
]
