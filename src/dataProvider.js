import { stringify } from "query-string"
import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
  GET_MANY,
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
  console.log("Dataprovider", type, resource, params)
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
      console.log("params.data", new Date(params.data.targetDate).getTime())
      switch (resource) {
        case TODOS:
          url = `${API_URL}/todos/create` //new url
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
          url = `${apiUrl}/todos/update/${params.id}` //new url
          break
      }
      break
    case DELETE:
      options.method = "DELETE"
      switch (resource) {
        case TODOS:
          url = `${apiUrl}/todos/delete`
          options.body = { _id: params.id }
          console.log("todoId", params.id)
          break
        default:
          break
      }
      break
    case DELETE_MANY:
      const deleteQuery = {
        filter: JSON.stringify({ ids: params.ids })
      }

      switch (resource) {
        case TODOS:
          url = `${apiUrl}/todos/delete/many`
          options.method = "DELETE"
          // options.body = JSON.stringify(deleteQuery);
          break
        default:
          break
      }
      break
    case GET_MANY: {
      const query = {
        filter: JSON.stringify({ ids: params.ids })
      }
      url = `${apiUrl}/${resource}?${stringify(query)}`
      switch (resource) {
        case TODOS:
          url = `${apiUrl}/todos/get/by/ids?${stringify(query)}` //new url
          break
        default:
          break
      }
      break
    }
    default:
      throw new Error(`Unsupported Data Provider request type ${type}`)
  }

  const token = localStorage.getItem('token')
  options.headers = {
    ...options.headers,
    mode:"cors",
    Authorization: token
  }
  console.log(url, {
    body: JSON.stringify(options.body),
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    method: options.method
  })
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
      console.log(json)
      switch (type) {
        case GET_MANY:
          console.log("data in get many", json)
          return {
            data: json.response
          }
        case GET_LIST:
          console.log("get list", json)
          let data = json.todos
          data = data.map((todo) => ({ id: todo._id, ...todo }));
          console.log({
            data,
            total: json.todos.length
          })
          return {
            data,
            total: json.total
          }
          break
        case CREATE:
        case UPDATE:
        case DELETE:
          return { data: { ...json.todo } }

        default:
          return { data: json.todo }
      }
    })
}
