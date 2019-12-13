import React from "react"
import { Admin, Resource } from "react-admin"
import Todos from "./Components/Todo"
import dataProvider, { TODOS } from "./dataProvider"
import authProvider from './Auth'
import login from './Components/Login'
const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} loginPage={login}>
    <Resource name={TODOS} {...Todos} />
  </Admin>
)

export default App
