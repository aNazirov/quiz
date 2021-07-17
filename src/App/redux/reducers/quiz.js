import { 
    FGBI_SUCCESS, 
    FG_ERROR, FG_START, 
    FG_SUCCESS, QUIZ_FINISH, 
    QUIZ_NEXT_QUESTION, 
    QUIZ_RETRY, 
    QUIZ_SET_STATE } from "../actions/actionTypes";

const initialState = {
    loading: false,
    quizes: [],
    error: null,
    results: {}, // {[id]: success error}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' 'error' }
    quiz: null
}
export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FG_START:
            return {
                ...state, loading: true
            }
        case FG_SUCCESS:
            return {
                ...state, quizes: action.quizes, loading: false
            }
        case FGBI_SUCCESS:
            return {
                ...state, quiz: action.quiz, loading: false
            }
        case FG_ERROR:
            return {
                ...state, error: action.error, loading: false
            }
        case QUIZ_SET_STATE:
            return {
                ...state, answerState: action.answerState, results: action.results
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state, activeQuestion: action.number, answerState: null
            }
        case QUIZ_FINISH:
            return {
                ...state, isFinished: true
            }
        case QUIZ_RETRY:
            return {
                ...state, activeQuestion: 0, answerState: null, isFinished: false, results: {}
            }
    
        default:
            return state
    }
}