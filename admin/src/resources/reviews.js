import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Filter,
} from 'react-admin';

import { ProductReferenceField } from './products';
import { UserReferenceField } from './users';

const ReviewFilter = (props) => (
  <Filter {...props}>
    {/* <TextInput label="Search" source="_name" alwaysOn /> */}
  </Filter>
);

export const ReviewList = (props) => (
  <List {...props} filters={<ReviewFilter />}>
    <Datagrid>
      <UserReferenceField />
      <ProductReferenceField />
      <TextField source="score" label="Score" />
      <TextField source="comment" label="Comment" />
    </Datagrid>
  </List>
);
