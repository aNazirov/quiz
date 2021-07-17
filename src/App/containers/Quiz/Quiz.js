import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {fetchGetById, quizClickAnswer, quizRetry} from '../../redux/actions/quiz'

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchGetById(this.props.match.params.id)
  }
  componentWillUnmount() {
    this.props.quizRetry()
  }
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {
            this.props.loading || !this.props.quiz
              ? <Loader />
              : this.props.isFinished
                ? <FinishedQuiz
                    results={this.props.results}
                    quiz={this.props.quiz}
                    onRetry={this.props.quizRetry}
                  />
                : <ActiveQuiz
                  answers={this.props.quiz[this.props.activeQuestion].answers}
                  question={this.props.quiz[this.props.activeQuestion].question}
                  onAnswerClick={this.props.quizClickAnswer}
                  quizLength={this.props.quiz.length}
                  answerNumber={this.props.activeQuestion + 1}
                  state={this.props.answerState}
                />
          }
        </div>
      </div>
    )
  }
}

function mSTP(state) {
  return {
    loading: state.quiz.loading,
    results: state.quiz.results, // {[id]: success error}
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState, // { [id]: 'success' 'error' }
    quiz: state.quiz.quiz
  }
}
function mDTP(dispatch) {
  return {
    fetchGetById: id => dispatch(fetchGetById(id)),
    quizClickAnswer: answerId => dispatch(quizClickAnswer(answerId)),
    quizRetry: () => dispatch(quizRetry())
  }
}

export default connect(mSTP, mDTP)(Quiz)