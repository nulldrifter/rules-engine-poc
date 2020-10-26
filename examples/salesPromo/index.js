const {Engine} = require('json-rules-engine')
const {rules} = require('./rules')
const {facts} = require('./facts')


const engine = new Engine(rules);

facts.forEach(async (fact) => {
  await engine.run(fact)
    .then(results => {
      delete fact['success-events']
      console.log(`------------------------------`)
      console.log(fact)
      console.log('\nQualifies for:')
      results.events.map(event => console.log(`  ${event.params.promo}`))
    })
    .catch(console.log)
})
