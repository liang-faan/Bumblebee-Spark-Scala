import React, { Component } from 'react';
import { Redirect, HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import {isLogin} from './service/auth'
// import {proxy} from './setupProxy'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));


const isAuthenticated = () => {
  //write your condition here
  return isLogin(); 
}


const UnauthenticatedRoute = ({ render: Render, ...rest }) => (
  <Route {...rest} render={(props) => (
    !isAuthenticated()
      ? <Render {...props} />
      : <Redirect to='/' />
  )} />
);


const AuthenticatedRoute = ({ render: Render, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated()
      ? <Render {...props} />
      : <Redirect to='/login' />
  )} />
);


class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <UnauthenticatedRoute exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <UnauthenticatedRoute exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <AuthenticatedRoute path="/" name="Home" render={props => <TheLayout {...props} />} />
            <AuthenticatedRoute path="/dashboard" name="Home" render={props => <TheLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
