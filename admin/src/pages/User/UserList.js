import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  Filter,
  EditButton,
} from "react-admin";

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search by phone" source="phone" alwaysOn />
    <TextInput label="Search by email" source="email" />
  </Filter>
);

const UserList = (props) => {
  return (
    <List
      {...props}
      exporter={false}
      title="User"
      filters={<UserFilter />}
      bulkActionButtons={false}
    >
      <Datagrid>
        <TextField source="_id" sortable={false} />
        <TextField source="phone" sortable={false} />
        <TextField source="email" sortable={false} />
        <TextField source="userRole" sortable={false} />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default UserList;
