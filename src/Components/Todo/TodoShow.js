import React, { Fragment } from "react"
import {
  Show,
  SimpleShowLayout,
  ChipField,
  TextField,
  EditButton,
  ImageField,
  DeleteButton
} from "react-admin"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"

const cardStyle = {
  width: "100%",
  minHeight: 300,
  margin: "1em",
  display: "inline-block",
  verticalAlign: "top"
}
class MyComparator extends React.Component {
  render() {
    const { record = {} } = this.props
    return (
      <Fragment>
        <Card style={cardStyle}>
          <CardHeader
            title={
              <Fragment>
                Title : <TextField record={record} source="title"></TextField>
              </Fragment>
            }
            subheader={
              <Fragment>
                Create Date :{" "}
                <CustomDateField record={record} source="createdAt" />
              </Fragment>
            }
          />
          <CardContent>
            <Fragment>
              Description : <br />
              <TextField record={record} source="desc"></TextField>
            </Fragment>
          </CardContent>
          <CardContent>
            {record.type === "image" ? (
              <ImageField record={record} source="path" />
            ) : (
              <video src={record.path} width="300px" controls></video>
            )}
            <br />
            <Fragment>
              Status : <ChipField record={record} source="status"></ChipField>
            </Fragment>
            <br />
            <Fragment>
              Target Date :{" "}
              <CustomDateField record={record} source="targetDate" />
            </Fragment>
          </CardContent>
          <CardActions style={{ textAlign: "right" }}>
            <DeleteButton />
            <EditButton />
          </CardActions>
        </Card>
      </Fragment>
    )
  }
}

const CustomDateField = ({ record = {}, source }) => {
  const data = new Date(record[source])

  return <span>{data.toDateString()}</span>
}

export default props => (
  <Show {...props}>
    <SimpleShowLayout>
      <MyComparator {...props} />
    </SimpleShowLayout>
  </Show>
)
