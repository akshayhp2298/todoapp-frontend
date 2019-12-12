import React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  ImageField,
  ImageInput
} from "react-admin"

export default props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="desc" />
      <TextInput source="status" />
      <DateInput source="targetDate" label="Target Date" />
      <SelectInput
        source="status"
        choices={[
          { id: "in-process", name: "in-process" },
          { id: "todo", name: "todo" },
          { id: "done", name: "done" }
        ]}
      />
      <ImageInput source="path" label="Related pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
)
