import axios from '../../axios/axios-quiz'
import { 
    FGBI_SUCCESS, 
    FG_ERROR, 
    FG_START, 
    FG_SUCCESS, 
    QUIZ_FINISH,
    QUIZ_NEXT_QUESTION, 
    QUIZ_SET_STATE,
    QUIZ_RETRY
} from './actionTypes'

export function fetchGet() {
    return async dispatch => {
        dispatch(fetchGetStart())
        try {
            const res = await axios.get('quizes.json')
            const quizes = []
        Object.keys(res.data).forEach((key, i) => {
            quizes.push({
            id : key,
            name: `Тест №${i + 1}`
            })
        })
            dispatch(fetchGetSuccess(quizes))
        } catch (error) {
            dispatch(fetchGetError(error))
        }
    }
}
export function fetchGetById(id) {
    return async dispatch => {
        dispatch(fetchGetStart())
        try {
            const res = await axios.get(`quizes/${id}.json`)
            dispatch(fetchGetByIdSucces({quiz: res.data}))
        } catch (error) {
            dispatch(fetchGetError(error))
        }
    }
}
export function quizClickAnswer(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }
        const question = state.quiz[state.activeQuestion]
        const results = state.results
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({[answerId]: 'success'}, results))
        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, results))
        }
        const timeout = window.setTimeout(() => {
            if (isQuizFinished(state)) {
                dispatch(finishQuiz())
            } else {
                dispatch(quizNextQuestion(state.activeQuestion + 1))
            }
            window.clearTimeout(timeout)
            }, 1000)
    }
}

export function fetchGetStart() {
    return {
        type: FG_START
    }
}
export function fetchGetSuccess(quizes) {
    return {
        type: FG_SUCCESS,
        quizes
    }
}
export function fetchGetByIdSucces({quiz}) {
    return {
        type: FGBI_SUCCESS,
        quiz
    }
}
export function fetchGetError(error) {
    return {
        type: FG_ERROR,
        error
    }
}
export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}
export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}
export function finishQuiz() {
    return {
        type: QUIZ_FINISH
    }
}
export function quizRetry() {
    return {
        type: QUIZ_RETRY
    }
}
function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}