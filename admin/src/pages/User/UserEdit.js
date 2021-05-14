import React from "react";
import {
  Edit,
  TextInput,
  required,
  SimpleForm,
  SelectInput,
} from "react-admin";

import { USER_ROLES } from "../../constants";

const UserEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source={props.id} />
        <TextInput validate={required()} source="phone" resetable="true" />
        <TextInput validate={required()} source="firstName" resetable="true" />
        <TextInput validate={required()} source="lastName" resetable="true" />
        <TextInput validate={required()} source="email" resetable="true" />
        {props.permissions === "superadmin" && (
          <SelectInput
            validate={required()}
            source="userRole"
            choices={USER_ROLES}
          />
        )}
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
