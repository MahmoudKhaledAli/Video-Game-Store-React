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
    const payload = err.response ? err.response.data : err;

    dispatch({
      type: ActionTypes.AUTH_ERROR,
      payload
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
    const payload = err.response ? err.response.data.replace('Unauthorized', 'Incorrent login information') : err;

    await dispatch({
      type: ActionTypes.AUTH_ERROR,
      payload
    });
    callback();

  } finally {
    callback();
  }
};

export const updateAddress = (newAddress, callback) => async dispatch => {
  const response = await axios.post('http://localhost:8080/user/updateaddress', { address: newAddress });

  dispatch({
    type: ActionTypes.UPDATE_ADDRESS,
    payload: response
  });

  callback();
};

export const fetchUserInfo = () => async dispatch => {
  try {
    const response = await axios.get('http://localhost:8080/user/fetchuserinfo');

    dispatch({
      type: ActionTypes.AUTH_USER,
      payload: response.data
    });
  } catch (err) {
    const payload = err.response ? err.response.data.replace('Unauthorized', 'Invalid or expired token') : err;

    dispatch({
      type: ActionTypes.AUTH_ERROR,
      payload
    });
  }
};

export const addToCart = (cartItem, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8080/user/addtocart', cartItem);

    dispatch({
      type: ActionTypes.ADD_TO_CART,
      payload: response.data
    });
  } catch (err) {
    const payload = err.response ? err.response.data : err;

    dispatch({
      type: ActionTypes.ADD_TO_CART_ERROR,
      payload
    });
  } finally {
    callback();
  }
};

export const fetchCart = () => async dispatch => {
  const response = await axios.get('http://localhost:8080/user/fetchcart');

  dispatch({
    type: ActionTypes.FETCH_CART,
    payload: response.data
  });
};

export const fetchFeatured = () => async dispatch => {
  const response = await axios.get('http://localhost:8080/fetchfeatured');

  dispatch({
    type: ActionTypes.FETCH_FEATURED,
    payload: response.data
  });
};

export const search = searchValues => async dispatch => {
  const response = await axios.post('http://localhost:8080/search', searchValues);

  dispatch({
    type: ActionTypes.SEARCH,
    payload: response.data
  });
};

export const addReview = (review, callback) => async dispatch => {
  const response = await axios.post('http://localhost:8080/user/addreview', review);

  dispatch({
    type: ActionTypes.ADD_REVIEW,
    payload: response.data
  });

  callback();
};

export const fetchProduct = id => async dispatch => {
  const response = await axios.get(`http://localhost:8080/fetchproduct?idproduct=${id}`);

  dispatch({
    type: ActionTypes.FETCH_PRODUCT,
    payload: response.data
  });
};

export const deleteItem = idproduct => async dispatch => {
  const response = await axios.post('http://localhost:8080/user/deletecart', { idproduct });

  dispatch({
    type: ActionTypes.DELETE_CART_ITEM,
    payload: response.data
  });
};

export const checkout = (total, coupon, callback) => async dispatch => {
  try {
    await axios.post('http://localhost:8080/user/checkout', { total, coupon });

    dispatch({
      type: ActionTypes.CHECKOUT,
      payload: {}
    });
  } catch (err) {
    const payload = err.response ? err.response.data : err;

    dispatch({
      type: ActionTypes.CHECKOUT_ERROR,
      payload
    })
  } finally {
    callback();
  }
};