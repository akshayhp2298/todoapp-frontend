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
  <Create {...props} >
    <SimpleForm redirect="/todos">
      <TextInput source="title" />
      <TextInput source="desc" />
      <DateInput source="targetDate" label="Target Date" />
      <TextInput source="status" disabled />
      <SelectInput
        source="status"
        choices={[
          { id: "in-process", name: "in-process" },
          { id: "todo", name: "todo" },
          { id: "done", name: "done" }
        ]}
      />
      <ImageInput source="path" label="Related pictures" accept="">
        <ImageField source="path" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
)
