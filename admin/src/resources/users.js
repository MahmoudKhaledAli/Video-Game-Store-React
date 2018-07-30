import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  EmailField,
  Edit,
  SimpleForm,
  DisabledInput,
  DateInput,
  TextInput,
  LongTextInput,
  Filter
} from 'react-admin';

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="_username" alwaysOn />
  </Filter>
);

export const UserList = (props) => (
  <List {...props} filters={<UserFilter />}>
    <Datagrid>
      <TextField source="id" label="Username" />
      <EmailField source="email" label="E-mail" />
      <TextField source="address" label="Address" />
      <DateField source="datecreated" label="Date Registered" />
      <EditButton />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.id}"` : ''}</span>;
};

export const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="Username" />
      <TextInput source="email" label="E-mail" />
      <LongTextInput source="address" label="Address" />
      <DateInput source="datecreated" label="Date Registered" />
    </SimpleForm>
  </Edit>
);