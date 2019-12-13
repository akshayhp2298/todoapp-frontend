import React from "react"
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  ImageField,
  ImageInput
} from "react-admin"

export default props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="desc" />
      <TextInput source="status" />
      <DateInput source="targetDate" label="Target Date" />
      <SelectInput
        source="status"
        choices={[
          { id: "in-process", name: "In-process" },
          { id: "todo", name: "Todo" },
          { id: "done", name: "Done" }
        ]}
      />
      {console.log(props.record)}
      <ImageInput source="path" label="Related pictures" accept="">
        <ImageField source="path" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
)
