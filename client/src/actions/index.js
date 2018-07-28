import * as ActionTypes from './types';
import axios from 'axios';

export const signup = (userInfo, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8080/signup', userInfo);

    dispatch({
      type: ActionTypes.AUTH_USER,
      payload: response.data
    });
    localStorage.setItem('token', response.data.token);
  } catch (err) {
    dispatch({
      type: ActionTypes.AUTH_ERROR,
      payload: 'Username or email already used'
    })
  } finally {
    callback();
  }
};

export const signout = (callback) => dispatch => {
  localStorage.removeItem('token');

  dispatch({
    type: ActionTypes.AUTH_USER,
    payload: {
      authenticated: '',
      username: '',
      address: ''
    }
  });

  callback();
}

export const signin = (loginInfo, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8080/signin', loginInfo);

    dispatch({
      type: ActionTypes.AUTH_USER,
      payload: response.data
    });
    if (loginInfo.remember) {
      localStorage.setItem('token', response.data.token);
    }
  } catch (err) {
    dispatch({
      type: ActionTypes.AUTH_ERROR,
      payload: 'Incorrect username or password'
    })
  } finally {
    callback();
  }
}