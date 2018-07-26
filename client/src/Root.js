import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from "redux-promise";

import reducers from 'reducers';


export const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(promiseMiddleware)
));


export default props => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
};