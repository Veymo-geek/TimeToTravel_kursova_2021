import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  Filter,
  EditButton,
} from "react-admin";

const TourFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search by place" source="place" alwaysOn />
    <TextInput label="Search by price" source="price" />
    <TextInput label="Search by rating" source="rating" />
  </Filter>
);

const TourList = (props) => {
  return (
    <List
      {...props}
      exporter={false}
      title="Tour"
      filters={<TourFilter />}
      bulkActionButtons={false}
    >
      <Datagrid>
        <TextField source="_id" sortable={false} />
        <TextField source="place" sortable={false} />
        <TextField source="price" sortable={false} />
        <TextField source="rating" sortable={false} />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default TourList;
