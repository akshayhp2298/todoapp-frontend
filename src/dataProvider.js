import { stringify } from "query-string"
import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
  DELETE_MANY
} from "react-admin"
const apiUrl = "https://todoapp2298.herokuapp.com/api"
// const apiUrl = "http://localhost:3003/api"
export const API_URL = apiUrl
export const TODOS = "Todos"
/**
 * Maps react-admin queries to my REST API
 *
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a data response
 */
export default async (type, resource, params) => {
  if (params.filter && params.filter.q) delete params.filter.q
  if (
    (type === CREATE || type === UPDATE) &&
    resource === TODOS &&
    params.data.path
  ) {
    const file = params.data.path.rawFile
    if (file) {
      let url = `https://api.cloudinary.com/v1_1/dxety0ieg`
      if (file.type.includes("image")) {
        params.data.type = "image"
        url = `${url}/image/upload`
      } else if (file.type.includes("video")) {
        params.data.type = "video"
        url = `${url}/video/upload`
      }
      let formdata = new FormData()
      formdata.append("file", file)
      formdata.append("upload_preset", "mgfc0zar")
      let response = await fetch(url, {
        method: "POST",
        body: formdata
      })
      response = await response.json()
      params.data.path = response.secure_url
    }
  }
  let url = ""
  const options = {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    })
  }
  switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination
      const { field, order } = params.sort
      options.method = "get"
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter)
      }
      switch (resource) {
        case TODOS:
          url = `${apiUrl}/todos/get/all?${stringify(query)}` //new url
          break
        default:
          break
      }
      break
    }
    case GET_ONE:
      options.method = "GET"
      switch (resource) {
        case TODOS:
          url = `${apiUrl}/todos/get/one/${params.id}` //new url
          break
        default:
          break
      }
      break
    case CREATE:
      url = `${apiUrl}`
      options.method = "POST"
      params.data.targetDate = new Date(params.data.targetDate).getTime()
      options.body = params.data
      switch (resource) {
        case TODOS:
          url = `${API_URL}/todos/create`
          break
        default:
          break
      }
      break
    case UPDATE:
      url = `${apiUrl}`
      options.method = "PUT"
      options.body = params.data
      switch (resource) {
        case TODOS:
          url = `${apiUrl}/todos/update/${params.id}`
          break
        default:
          break
      }
      break
    case DELETE:
      options.method = "DELETE"
      switch (resource) {
        case TODOS:
          url = `${apiUrl}/todos/delete`
          options.body = { _id: params.id }
          break
        default:
          break
      }
      break
    case DELETE_MANY:
      switch (resource) {
        case TODOS:
          url = `${apiUrl}/todos/delete/many`
          options.method = "DELETE"
          options.body = { ids: params.ids }
          break
        default:
          break
      }
      break
    default:
      throw new Error(`Unsupported Data Provider request type ${type}`)
  }

  const token = localStorage.getItem("token")
  options.headers = {
    ...options.headers,
    mode: "cors",
    Authorization: token
  }

  return fetch(url, {
    body: JSON.stringify(options.body),
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    method: options.method
  })
    .then(res => {
      return res.json()
    })
    .then(json => {
      if (!json.done) {
        alert(json.message)
        return Promise.reject(json.message)
      }
      switch (type) {
        case GET_LIST:
          let data = json.todos
          data = data.map(todo => ({ id: todo._id, ...todo }))

          return {
            data,
            total: json.total
          }
        case CREATE:
          alert("Todo Created")
          json.todo.id = json.todo._id
          return { data: { ...json.todo } }
        case UPDATE:
          alert("Todo Updated")
          json.todo.id = json.todo._id
          return { data: { ...json.todo } }
        case DELETE:
        case DELETE_MANY:
          alert("Todo Deleted")
          return
        default:
          json.todo.id = json.todo._id
          return { data: json.todo }
      }
    })
}
