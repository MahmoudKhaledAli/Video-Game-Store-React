import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  SelectField,
  Filter,
  ArrayField,
  DisabledInput,
  SimpleForm,
  SelectInput,
  Edit,
  EditButton
} from 'react-admin';

import { ProductReferenceField } from './products';
import { UserReferenceField } from './users';

const orderStatus = [
  { id: 0, name: 'Pending' },
  { id: 1, name: 'Approved' },
  { id: 2, name: 'Shipped' },
  { id: 3, name: 'Delivered' }
];

const OrderFilter = (props) => (
  <Filter {...props}>
    {/* <TextInput label="Search" source="_name" alwaysOn /> */}
  </Filter>
);

export const OrderList = (props) => (
  <List {...props} filters={<OrderFilter />}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <DateField source="datecreated" label="Date" />
      <UserReferenceField />
      <ArrayField source="items">
        <Datagrid>
          <ProductReferenceField label="Product" />
          <TextField source="quantity" label="Quantity" />
        </Datagrid>
      </ArrayField>
      <TextField source="total" label="Total" />
      <SelectField source="status" label="Status" choices={orderStatus} />
      <EditButton />
    </Datagrid>
  </List>
);

const OrderTitle = ({ record }) => {
  return <span>Product {record ? `"${record.id}"` : ''}</span>;
};

export const OrderEdit = (props) => (
  <Edit title={<OrderTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" label="ID" />
      <DisabledInput source="datecreated" label="Date" />
      <DisabledInput source="username" label="User" />
      <ArrayField source="items">
        <Datagrid>
          <ProductReferenceField label="Product" />
          <TextField source="quantity" label="Quantity" />
        </Datagrid>
      </ArrayField>
      <DisabledInput source="total" />
      <SelectInput source="status" choices={orderStatus} />
    </SimpleForm>
  </Edit>
);