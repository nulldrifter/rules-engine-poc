# Rules Engine Demo
The purpose of this repository is to provide an overview of rules engines in a straight-forward and relatable manner.

Built with [json-rules-engine](https://github.com/CacheControl/json-rules-engine).


## Examples
#### Sales Promotion
`npm run example:sales`

This example demonstrates how a set of facts can be compared to a set of rules to discover which rules are truthy.

Each fact represents a contrived order summary and is checked to see which of the following sales discounts are applicable:
* 15% off all items
* free shipping for premium customers when purchased through the website
* $10 off when you spend $100 or more in store


#### Ticketing System
`npm run example:tickets`

This example demonstrates how to apply rules in a hierarchical manner, trigger both engine-wide and rule specific events, trace facts through rule evaluations and use the almanac.

Each fact represents a contrived ticket from a ticketing system and are ran through the engine to perform the following tasks:
* Send an email if the ticket is overdue
* Set the assignee using system/default logic
* Override the assignee & increase severity under certain circumstances
