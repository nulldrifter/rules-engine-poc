exports.rules = [
  // company-wide sale: 15% off during October sales event
  {
    conditions: {
      all: [{
        fact: 'month',
        operator: 'equal',
        value: 'Oct'
      }]
    },
    event: {
      type: 'octoberSale',
      params: {
        promo: '15% off'
      }
    }
  },

  // premium customers get free shipping online
  {
    conditions: {
      all: [
        {
          fact: 'isPremiumCustomer',
          operator: 'equal',
          value: true
        },
        {
          fact: 'location',
          operator: 'equal',
          value: 'online'
        },
      ]
    },
    event: {
      type: 'premiumOnlineDiscount',
      params: {
        promo: 'free shipping'
      }
    }
  },

  // shop in store and get $10 off when you spend $100 or more
  {
    conditions: {
      all: [
        {
          fact: 'location',
          operator: 'notEqual',
          value: 'online'
        },
        {
          fact: 'total',
          operator: 'greaterThanInclusive',
          value: 100
        },
      ]
    },
    event: {
      type: '10off100',
      params: {
        promo: '$10 off'
      }
    }
  },
]
