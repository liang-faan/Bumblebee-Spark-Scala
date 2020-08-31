import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { getUser, isLoggedIn } from "../services/auth"

import Amplify from "aws-amplify";
import awsExports from "../aws-exports";
Amplify.configure(awsExports);

export default () => (
  <Layout>
    <h1>Webconsole to manage Webflow jobs.</h1>
    <p>
      Includes Submit, Schedule, Query, Stop, Cancel Spark jobs.
    </p>
    <h1>Welcome {isLoggedIn() ? getUser().name : "Here"}!</h1>
        <p>
            {isLoggedIn() ? (
            <>
                You are logged in, so check your{" "}
                <Link to="/app/profile">profile</Link>
            </>
            ) : (
            <>
                Please <Link to="/app/login">log in</Link>
            </>
            )}
        </p>
  </Layout>
)