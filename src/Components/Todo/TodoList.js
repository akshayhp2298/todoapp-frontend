import React from "react"
import {
  Datagrid,
  List,
  ChipField,
  TextField,
  EditButton,
  DeleteButton,
  Filter,
  TextInput,
  SimpleList
} from "react-admin"

const isSmall = window.innerWidth <= 600
export default props => (
  <List {...props} title="Todos" filters={<TodoFilter />}>
    {isSmall ? (
      <SimpleList
        primaryText={record => record.title}
        secondaryText={record => record.desc}
        tertiaryText={record =>
          new Date(record.targetDate).toLocaleDateString()
        }
      />
    ) : (
      <Datagrid rowClick="show">
        <TextField source="title" />
        <TextField source="desc" />
        <ChipField source="status" />
        <CustomDateField source="targetDate" {...props} />
        <CustomDateField source="createdAt" {...props} />
        <TextField source="type" />
        <DeleteButton />
        <EditButton />
      </Datagrid>
    )}
  </List>
)

const CustomDateField = ({ record = {}, source }) => {
  const data = new Date(record[source])

  return <span>{data.toDateString()}</span>
}

const TodoFilter = props => {
  return (
    <Filter {...props}>
      <TextInput label="Search Title" source="title" alwaysOn />
      <TextInput label="Description" source="desc" />
    </Filter>
  )
}
