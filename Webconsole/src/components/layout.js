import React from "react"
import { Link,navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../services/auth"
const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

let greetingMessage = ""
  if (isLoggedIn()) {
    greetingMessage = `Hello ${getUser().name}`
  } else {
    greetingMessage = "You are not logged in"
  }

export default ({ children }) => (
  
  <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
    <header style={{ marginBottom: `1.5rem` }}>
      <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
        <h3 style={{ display: `inline` }}>MySweetSite</h3>
      </Link>
      <ul style={{ listStyle: `none`, float: `right` }}>
        <ListLink to="/">Home</ListLink>
        <ListLink to="/about/">About</ListLink>
        <ListLink to="/contact/">Contact</ListLink>
        <ListLink to="/app/profile">{greetingMessage}</ListLink>
        {isLoggedIn() ? (
          <a
          href="/"
          onClick={event => {
            event.preventDefault()
            logout(() => navigate(`/app/login`))
          }}
        >
          Logout
        </a>
        ) : null}
      </ul>
    </header>
    {children}
  </div>
)