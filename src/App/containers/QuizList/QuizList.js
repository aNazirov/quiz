import React, {Component} from 'react'
import classes from './QuizList.module.css'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {fetchGet} from '../../redux/actions/quiz'

class QuizList extends Component {
  renderQuizes() {
    return this.props.quizes.map( quiz => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  componentDidMount() {
    this.props.fetchGet()
  }
  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
            {
              this.props.loading
                ? <Loader />
                : <ul> { this.renderQuizes() } </ul>
            }
        </div>
      </div>
    )
  }
}

function mSTP(state){
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}
function mDTP(dispatch){
  return {
    fetchGet: () => dispatch(fetchGet())
  }
}


export default connect(mSTP, mDTP)(QuizList)