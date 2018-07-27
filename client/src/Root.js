import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from "redux-thunk";

import reducers from 'reducers';


export const store = createStore(reducers,
  { auth: { authenticated: localStorage.getItem('token') } },
  composeWithDevTools(
    applyMiddleware(reduxThunk)
  ));


export default props => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
};