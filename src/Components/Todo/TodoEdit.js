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
      <ImageInput source="path" label="Related pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
)
