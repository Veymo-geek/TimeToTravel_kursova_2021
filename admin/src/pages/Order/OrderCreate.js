import React from "react";
import {
  Create,
  DateTimeInput,
  TextInput,
  required,
  NumberInput,
  SimpleForm,
  SelectInput,
} from "react-admin";

import { TRAIN_CLASSES } from "../../constants";

const PostCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput
          validate={required()}
          source="departureStation"
          resetable="true"
        />
        <TextInput
          validate={required()}
          source="arrivalStation"
          resetable="true"
        />
        <DateTimeInput
          validate={required()}
          source="departureTime"
          resetable="true"
        />
        <DateTimeInput
          validate={required()}
          source="arrivalTime"
          resetable="true"
        />
        <NumberInput
          validate={required()}
          source="placeCount"
          resetable="true"
        />
        <SelectInput
          source="trainClass"
          choices={TRAIN_CLASSES}
          defaultValue="STANDARD"
        />
      </SimpleForm>
    </Create>
  );
};

export default PostCreate;
