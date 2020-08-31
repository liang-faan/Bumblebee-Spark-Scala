import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import Login from "../components/login"
import Amplify, { API, graphqlOperation } from 'aws-amplify'

import { withAuthenticator } from '@aws-amplify/ui-react'

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile" component={Profile} />
      <Login path="/app/login" />
    </Router>
  </Layout>
)

export default withAuthenticator(App)