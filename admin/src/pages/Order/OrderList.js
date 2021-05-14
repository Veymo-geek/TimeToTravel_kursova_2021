import * as React from "react";
import { List, Datagrid, TextField, EditButton } from "react-admin";

const TourList = (props) => {
  return (
    <List {...props} exporter={false} title="Order" bulkActionButtons={false}>
      <Datagrid>
        <TextField source="_id" sortable={false} />
        <TextField source="userId" sortable={false} />
        <TextField source="tourId" sortable={false} />
        <TextField source="createdAt" sortable={false} />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default TourList;
