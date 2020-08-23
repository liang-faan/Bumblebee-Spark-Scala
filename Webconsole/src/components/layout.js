import React from "react";
import { Link, navigate } from "gatsby";
import { getUser, isLoggedIn, logout } from "../services/auth";
import Sidebar from "./Sidebar";
const ListLink = (props) => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
);

let greetingMessage = "";
if (isLoggedIn()) {
  greetingMessage = `Hello ${getUser().name}`;
} else {
  greetingMessage = "You are not logged in";
}

const items = [
  { name: 'home', label: 'Home' },
  {
    name: 'billing',
    label: 'Billing',
    items: [
      { name: 'statements', label: 'Statements' },
      { name: 'reports', label: 'Reports' },
    ],
  },
  {
    name: 'settings',
    label: 'Settings',
    items: [
      { name: 'profile', label: 'Profile' },
      { name: 'insurance', label: 'Insurance' },
      {
        name: 'notifications',
        label: 'Notifications',
        items: [
          { name: 'email', label: 'Email' },
          {
            name: 'desktop',
            label: 'Desktop',
            items: [
              { name: 'schedule', label: 'Schedule' },
              { name: 'frequency', label: 'Frequency' },
            ],
          },
          { name: 'sms', label: 'SMS' },
        ],
      },
    ],
  },
]

export default ({ children }) => (
  <div style={{width: `100%`}}>
    <header style={{ marginBottom: `1.5rem` }}>
      <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
        <h1 style={{ display: `inline` }}>AirFlow Webconsole</h1>
      </Link>
      <ul style={{ listStyle: `none`, float: `right` }}>
        {/* <ListLink to="/">Home</ListLink> */}
        {/* <ListLink to="/">Job Submit</ListLink> */}
        <ListLink to="/about/">About</ListLink>
        <ListLink to="/contact/">Contact</ListLink>
        <ListLink to="/app/profile">{greetingMessage}</ListLink>
        {isLoggedIn() ? (
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              logout(() => navigate(`/app/login`));
            }}
          >
            Logout
          </a>
        ) : null}
      </ul>
    </header>
    <div class = 'container'>
        <div class="left-half"><Sidebar items = {items}/></div>
        <div class="right-half">{children}</div>
    </div>
    
  </div>
);
