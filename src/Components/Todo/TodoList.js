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
import Typography from "@material-ui/core/Typography"
import CardMedia from "@material-ui/core/CardMedia"
import CardHeader from "@material-ui/core/CardHeader"
import Avatar from "@material-ui/core/Avatar"
import PersonIcon from "@material-ui/core/Avatar"
import { TODOS } from "../../dataProvider"
import json2mq from "json2mq"
import useMediaQuery from "@material-ui/core/useMediaQuery"
const size = window.innerWidth
console.log(size>=600)
const cardStyle =
  size >= 600
    ? {
        width: "45%",
        minHeight: 300,
        margin: "0.5em",
        display: "inline-block",
        verticalAlign: "top"
      }
    : {
        width: "100%",
        minHeight: 300,
        margin: "1em",
        display: "inline-block",
        verticalAlign: "top"
      }
const TodoGrid = ({ ids, data, basePath }) =>
  ids.length !== 0 ? (
    <div style={{ margin: "1em" }}>
      {ids.map(id => (
        <Card key={id} style={cardStyle}>
          <CardHeader
            title={<TextField record={data[id]} source="title" />}
            subheader={<CustomDateField record={data[id]} source="createdAt" />}
          />
          <CardContent>
            <TextField record={data[id]} source="desc" />
          </CardContent>
          <CardContent>
            {data[id].type === "image" ? (
              <ImageField record={data[id]} source="path" />
            ) : (
              <video src={data[id].path} width="300px" controls></video>
            )}
            <Typography gutterBottom>
              Status :<ChipField record={data[id]} source="status"></ChipField>
            </Typography>
            <Typography gutterBottom>
              Target Date :
              <CustomDateField record={data[id]} source="targetDate" />
            </Typography>
          </CardContent>
          <CardActions style={{ textAlign: "right" }}>
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
  <List
    {...props}
    title="Todos"
    filters={<TodoFilter />}
    sort={{ field: "targetDate", order: "ASC" }}
  >
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
      <TextInput label="Search Title" source="title" alwaysOn />
      <TextInput label="Description" source="desc" />
    </Filter>
  )
}
