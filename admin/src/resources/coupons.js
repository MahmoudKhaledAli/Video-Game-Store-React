import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  SelectField,
  Edit,
  Create,
  SimpleForm,
  DisabledInput,
  NumberInput,
  SelectInput,
  TextInput,
  LongTextInput,
  Filter
} from 'react-admin';

const CouponFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="_name" alwaysOn />
  </Filter>
);

export const CouponList = (props) => (
  <List {...props} filters={<CouponFilter />}>
    <Datagrid>
      <TextField source="id" label="Name" />
      <TextField source="discount" label="Discount" />
      <TextField source="amount" label="Remaining" />
      <EditButton />
    </Datagrid>
  </List>
);

const CouponTitle = ({ record }) => {
  return <span>Product {record ? `"${record.id}"` : ''}</span>;
};

const CouponForm = props => (
  <SimpleForm {...props}>
    <TextInput source="id" />
    <NumberInput source="discount" />
    <NumberInput source="amount" />
  </SimpleForm>
)

export const CouponEdit = (props) => (
  <Edit title={<CouponTitle />} {...props}>
    <CouponForm {...props} />
  </Edit>
);

export const CouponCreate = (props) => (
  <Create {...props}>
    <CouponForm {...props} />
  </Create>
);