import React from "react";
import {
  Edit,
  DateInput,
  TextInput,
  required,
  SimpleForm,
  NumberInput,
} from "react-admin";

const TourEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source={props.id} />
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
    </Edit>
  );
};

export default TourEdit;
