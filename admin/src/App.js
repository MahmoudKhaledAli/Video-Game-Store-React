import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { ProductList, ProductEdit, ProductCreate } from './resources/products';
import { UserList, UserEdit } from './resources/users';
import { CouponList, CouponEdit, CouponCreate } from './resources/coupons';
import { ReviewList } from './resources/reviews';
import Dashboard from './dashboard';
import authProvider from './authProvider';

import ProductIcon from '@material-ui/icons/Games';
import UserIcon from '@material-ui/icons/Group';
import CouponIcon from '@material-ui/icons/CardGiftcard'

const dataProvider = jsonServerProvider('http://localhost:8080/admin');
const App = () => (
  <Admin
    dashboard={Dashboard}
    dataProvider={dataProvider}
    title="Video Game Store"
  >
    <Resource name="products" list={ProductList} edit={ProductEdit} create={ProductCreate} icon={ProductIcon} />
    <Resource name="users" list={UserList} edit={UserEdit} icon={UserIcon} />
    <Resource name="coupons" list={CouponList} edit={CouponEdit} create={CouponCreate} icon={CouponIcon} />
    <Resource name="reviews" list={ReviewList} />
  </Admin>);

export default App;