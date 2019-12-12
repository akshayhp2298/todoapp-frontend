import React from "react"
import {
  List,
  ChipField,
  TextField,
  EditButton,
  ImageField,
  DeleteButton,
  Filter,
  TextInput,
  Datagrid
} from "react-admin"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import CardHeader from "@material-ui/core/CardHeader"
import Avatar from "@material-ui/core/Avatar"
import PersonIcon from "@material-ui/core/Avatar"
import { TODOS } from "../../dataProvider"
import { useNotify } from "ra-core"

const cardStyle = {
  width: "45%",
  minHeight: 300,
  margin: "0.5em",
  display: "inline-block",
  verticalAlign: "top"
}
const TodoGrid = ({ ids, data, basePath }) =>

  ids.length !== 0 ? (
    <div style={{ margin: "2em" }}>
      {ids.map(id => (
        <Card key={id} style={cardStyle}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            record={data[id]}
            image={data[id].path}
            title="Contemplative Reptile"
          />
          <CardHeader
            title={<TextField record={data[id]} source="title" />}
            subheader={
              <CustomDateField record={data[id]} source="targetDate" />
            }
            avatar={<Avatar icon={<PersonIcon />} />}
          />
          <CardContent>
            <TextField record={data[id]} source="desc" />
          </CardContent>
          <CardContent>
            <ImageField record={data[id]} source="path" />
          </CardContent>
          <CardActions style={{ textAlign: "right" }}>
            Status : <ChipField record={data[id]} source="status"></ChipField>
            <DeleteButton
              resource={TODOS}
              basePath={basePath}
              record={data[id]}
            />
            <EditButton
              resource={TODOS}
              basePath={basePath}
              record={data[id]}
            />
          </CardActions>
        </Card>
      ))}
    </div>
  ) : (
    <div>No Todos yet </div>
  )
TodoGrid.defaultProps = {
  data: {},
  ids: []
}
export default props => (
  <List {...props} title="Todos" sort={{ field: 'targetDate', order: 'ASC' }}>
    <TodoGrid></TodoGrid>
  </List>
)

const CustomDateField = ({ record = {}, source }) => {
  
  const data = new Date(record[source])

  return <span>{data.toDateString()}</span>
}

const TodoFilter = props => {
  return (
    <Filter {...props}>
      <TextInput label="title.search" source="title" alwaysOn />
    </Filter>
  )
}
