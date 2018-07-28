const defaultState = {
  orders: []
}

export function ordersReducer(state = defaultState, action) {
  return [
    {
      idorder: 1,
      items: [{ name: 'FIFA 13', quantity: 12 }, { name: 'Injustice', quantity: 5 }],
      datecreated: '7/28/2018',
      status: 0,
      total: 100
    },
    {
      idorder: 2,
      items: [{ name: 'FIFA 17', quantity: 12 }, { name: 'Injustice 2', quantity: 5 }],
      datecreated: '7/22/2018',
      status: 2,
      total: 1000
    }
  ]
}