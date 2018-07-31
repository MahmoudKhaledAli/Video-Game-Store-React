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

import { ProductReferenceField } from './products';

const ReviewFilter = (props) => (
  <Filter {...props}>
    {/* <TextInput label="Search" source="_name" alwaysOn /> */}
  </Filter>
);

export const ReviewList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="username" label="Username" />
      <ProductReferenceField />
      <TextField source="score" label="Score" />
      <TextField source="comment" label="Comment" />
    </Datagrid>
  </List>
);

// const ProductTitle = ({ record }) => {
//   return <span>Product {record ? `"${record.name}"` : ''}</span>;
// };

// export const ProductEdit = (props) => (
//   <Edit title={<ProductTitle />} {...props}>
//     <SimpleForm>
//       <DisabledInput source="id" />
//       <TextInput source="name" />
//       <TextInput source="imgpath" label="Image URL" />
//       <SelectInput source="platform" choices={platforms} />
//       <NumberInput source="price" />
//       <NumberInput source="stock" />
//       <NumberInput source="sales" />
//       <NumberInput source="sale" />
//       <LongTextInput source="descripton" label="Description" />
//     </SimpleForm>
//   </Edit>
// );

// export const ProductCreate = (props) => (
//   <Create {...props}>
//     <SimpleForm>
//       <TextInput source="name" />
//       <TextInput source="imgpath" />
//       <SelectInput source="platform" choices={platforms} />
//       <NumberInput source="price" />
//       <NumberInput source="stock" />
//       <NumberInput source="sales" />
//       <NumberInput source="sale" />
//       <LongTextInput source="descripton" label="Description" />
//     </SimpleForm>
//   </Create>
// );