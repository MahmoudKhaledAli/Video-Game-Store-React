import React from 'react';
import {
  List,
  Datagrid,
  ReferenceField,
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

const platforms = [
  { id: 0, name: 'PC' },
  { id: 1, name: 'PS4' },
  { id: 2, name: 'Xbox One' }
];

const ProductFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="_name" alwaysOn />
  </Filter>
);

export const ProductList = (props) => (
  <List {...props} filters={<ProductFilter />}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="stock" label="Stock" />
      <SelectField source="platform" label="Platform" choices={platforms} />
      <TextField source="price" label="Price" />
      <TextField source="sales" label="Sales" />
      <TextField source="sale" label="Sale %" />
      <EditButton />
    </Datagrid>
  </List>
);

const ProductTitle = ({ record }) => {
  return <span>Product {record ? `"${record.name}"` : ''}</span>;
};

export const ProductEdit = (props) => (
  <Edit title={<ProductTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <TextInput source="imgpath" label="Image URL" />
      <SelectInput source="platform" choices={platforms} />
      <NumberInput source="price" />
      <NumberInput source="stock" />
      <NumberInput source="sales" />
      <NumberInput source="sale" />
      <LongTextInput source="descripton" label="Description" />
    </SimpleForm>
  </Edit>
);

export const ProductCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="imgpath" />
      <SelectInput source="platform" choices={platforms} />
      <NumberInput source="price" />
      <NumberInput source="stock" />
      <NumberInput source="sales" />
      <NumberInput source="sale" />
      <LongTextInput source="descripton" label="Description" />
    </SimpleForm>
  </Create>
);

const ProductReferenceField = props => (
  <ReferenceField
    label="Product"
    source="idproduct"
    reference="products"
    {...props}
  >
    <TextField source="name" />
  </ReferenceField>
);

ProductReferenceField.defaultProps = {
  source: 'idproduct',
  addLabel: true,
};

export { ProductReferenceField };