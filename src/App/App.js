import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import { connect } from 'react-redux'
import Logout from './components/Logout/Logout'
import { autoLogin} from './redux/actions/auth'

class App extends Component {
  componentDidMount() {
    this.props.autoLogin()
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" component={QuizList} />
        <Redirect to={'/'}/>
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={QuizList} />
          <Redirect to={'/'}/>
        </Switch>
      )
    }
    return (
      
      <Layout>
        {routes}
      </Layout>
    )
  }
}
function mSTP(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}
function mDTP(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}
export default withRouter(connect(mSTP, mDTP)(App))
