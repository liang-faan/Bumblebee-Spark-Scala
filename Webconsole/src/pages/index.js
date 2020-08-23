import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { getUser, isLoggedIn } from "../services/auth"


export default () => (
  <Layout>
    <h1>Hi! I'm building a fake Gatsby site as part of a tutorial!</h1>
    <p>
      What do I like to do? Lots of course but definitely enjoy building
      websites.
    </p>
    <h1>Hello {isLoggedIn() ? getUser().name : "world"}!</h1>
        <p>
            {isLoggedIn() ? (
            <>
                You are logged in, so check your{" "}
                <Link to="/app/profile">profile</Link>
            </>
            ) : (
            <>
                You should <Link to="/app/login">log in</Link> to see restricted
                content
            </>
            )}
        </p>
  </Layout>
)