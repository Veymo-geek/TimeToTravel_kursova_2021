import React from "react";
import {
  Create,
  DateInput,
  TextInput,
  required,
  NumberInput,
  SimpleForm,
} from "react-admin";

const TourCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <NumberInput
          validate={required()}
          source="price"
          resetable="true"
          max={9000000}
        />
        <TextInput validate={required()} source="place" resetable="true" />
        <DateInput validate={required()} source="startDate" resetable="true" />
        <DateInput validate={required()} source="endDate" resetable="true" />
        <NumberInput
          validate={required()}
          source="rating"
          resetable="true"
          step={0.5}
          max={5}
          min={0}
        />
        <TextInput
          validate={required()}
          source="description"
          resetable="true"
        />
      </SimpleForm>
    </Create>
  );
};

export default TourCreate;
