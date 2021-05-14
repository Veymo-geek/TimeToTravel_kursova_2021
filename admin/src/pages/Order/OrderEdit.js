import React from "react";
import { Edit, TextInput, required, SimpleForm } from "react-admin";

const TrainEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source={props.id} />
        <TextInput validate={required()} source="tourId" resetable="true" />
      </SimpleForm>
    </Edit>
  );
};

export default TrainEdit;
