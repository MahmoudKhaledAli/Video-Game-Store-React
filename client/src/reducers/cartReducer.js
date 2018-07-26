const defaultState = {
  cart: [],
  total: 0
}

export function cartReducer(state = defaultState, action) {
  return {
    cartItems: [
      {
        idproduct: 1,
        quantity: 2,
        final_price: 200
      },
      {
        idproduct: 2,
        quantity: 3,
        final_price: 300
      }
    ],
    total: 500
  }
}