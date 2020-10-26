const {Engine} = require('json-rules-engine')
const {systemRules, departmentRules} = require('./rules');
const {facts} = require('./facts');


const engine = new Engine([...systemRules, ...departmentRules])

engine.on('success', (event, almanac, ruleResult) => {
  almanac.factValue('id').then(id => {
    render(`Ticket #${id} passed ${ruleResult.name}. ${event.params.message}`, ruleResult)
    updateTicket(id, event);
  })
})

engine.on('failure', (event, almanac, ruleResult) => {
  almanac.factValue('id').then(id => {
    render(`Ticket #${id} fell through ${ruleResult.name};`, ruleResult)
  })
})

function render (message, ruleResult) {
  const detail = ruleResult.conditions.all
    .filter(condition => !condition.result)
    .map(condition => {
      switch (condition.operator) {
        case 'equal':
          return `${condition.fact} !== ${condition.value}`
        case 'greaterThanInclusive':
          return `${condition.fact} of ${condition.factResult} was too low`
      }
    }).join(' and ')
  console.log(`${message} ${detail}`)
}

function updateTicket(factId, event) {
  const factsIndex = facts.findIndex(fact => fact.id === factId)
  switch(event.type) {
    case 'assignment':
      facts[factsIndex].assignee = event.params.assignee
      break
    case 'outage':
      facts[factsIndex].assignee = event.params.assignee
      facts[factsIndex].severity = event.params.severity
  }
}

(async () => {
  await Promise.all(facts.map(fact => engine.run(fact)))
  facts.forEach(fact => delete fact['success-events'])
  console.log(facts);
})()
