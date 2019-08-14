import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
//menu
import Menu from './menu'
//pages
import Form from '../pages/login'
import Home from '../pages/home'
import Page404 from '../pages/404'
import Workers from '../pages/workers'
import WorkerCard from '../pages/workerCard'
import AddCard from '../pages/add'

const PageRouter = ({ auth }) =>
  <Router>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Form} />
      <PrivateRoute exact path='/workers' component={Workers} auth={auth} />
      <PrivateRoute exact path='/workers/add/' component={AddCard} auth={auth} />
      <PrivateRoute exact path='/workers/:id/' component={WorkerCard} auth={auth} />
      <Route component={Page404} />
    </Switch>
  </Router>

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PageRouter)

const PrivateRoute = ({ component: Component, auth, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      auth ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
    }
  />
