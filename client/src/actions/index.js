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
    console.log(err);

    dispatch({
      type: ActionTypes.AUTH_ERROR,
      payload: 'Username or email already used'
    });
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
};

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
    });
  } finally {
    callback();
  }
};

export const updateAddress = (newAddress, callback) => async dispatch => {
  const response = await axios.post('http://localhost:8080/updateaddress', { address: newAddress });

  dispatch({
    type: ActionTypes.UPDATE_ADDRESS,
    payload: response
  });

  callback();
};

export const fetchUserInfo = () => async dispatch => {
  try {
    const response = await axios.get('http://localhost:8080/fetchuserinfo');

    dispatch({
      type: ActionTypes.AUTH_USER,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.AUTH_ERROR,
      payload: 'Invalid token'
    });
  }
};

export const addToCart = (cartItem, callback) => async dispatch => {
  const response = await axios.post('http://localhost:8080/addtocart', cartItem);

  dispatch({
    type: ActionTypes.ADD_TO_CART,
    payload: response.data
  });

  callback();
};

export const fetchCart = () => async dispatch => {
  const response = await axios.get('http://localhost:8080/fetchcart');

  dispatch({
    type: ActionTypes.FETCH_CART,
    payload: response.data
  })
};