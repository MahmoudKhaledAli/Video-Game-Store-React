import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Filter,
  ReferenceInput,
  SelectInput
} from 'react-admin';

import { ProductReferenceField } from './products';
import { UserReferenceField } from './users';

const ReviewFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput label="User" source="_username" reference="users">
      <SelectInput optionText="id" />
    </ReferenceInput>
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
