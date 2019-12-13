import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from "react-admin"
import { API_URL } from "../dataProvider"
export default async (type, params) => {
  if (type === AUTH_LOGIN) {
    try {
      const email = params.username
      const password = params.password
      console.log(email, password)
      let data = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        }),
        json: true
      })
      data = await data.json()
      if(data.done) {
        localStorage.setItem('token',data.token)
        return Promise.resolve()
      }else{
        alert(data.message)
        return Promise.reject()
      }
    } catch (exception) {
      console.log(exception)
      return Promise.reject()
    }
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token')
    return Promise.resolve()
  }
  if (type === AUTH_ERROR) {
    // localStorage.removeItem('token')
    return Promise.resolve()
  }
  if (type === AUTH_CHECK) {
    let token = localStorage.getItem("token")
    if (!token) {
      return Promise.reject()
    }
    return Promise.resolve()
  }
}
