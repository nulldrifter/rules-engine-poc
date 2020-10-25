const {Engine} = require('json-rules-engine')
const {ecommerce} = require('./rules');
const {facts} = require('./facts');


const engine = new Engine(ecommerce);

facts.map((fact) => {+
  engine.run(fact)
    .then(results => {
      delete fact['success-events'];
      console.log(`------------------------------`);
      console.log(fact);
      console.log('\nQualifies for:');
      results.events.map(event => console.log(`  ${event.params.data}`))
    })
    .catch(console.log)
})
