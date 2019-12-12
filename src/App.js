import React from "react"

import { Route } from "react-router";
import Signup from './Components/Signup'
import { Admin, Resource } from "react-admin"
import Todos from "./Components/Todo"
import dataProvider, { TODOS } from "./dataProvider"
import authProvider from './Auth'
import login from './Components/Login'
const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} loginPage={login}
  customRoutes={[
      <Route exact path="/signup" component={Signup} noLayout />
    ]}>
    <Resource name={TODOS} {...Todos} />
  </Admin>
)

export default App
