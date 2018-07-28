import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import axios from 'axios';

import reducers from 'reducers';

const baseApiAddress = 'http://localhost:8080/';

if (!localStorage.getItem('token')) {
  localStorage.removeItem('token');
}

export const store = createStore(reducers,
  {
    auth: {
      authenticated: localStorage.getItem('token')
    }
  },
  composeWithDevTools(
    applyMiddleware(reduxThunk, reduxPromise)
  ));

axios.interceptors.request.use(config => {
  if (config.url.startsWith(baseApiAddress)) {
    const token = store.getState().auth.authenticated;

    if (token) {
      config.headers.authorization = token;
    }
  }

  return config;
},
  error => Promise.reject(error)
);

export default props => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
};