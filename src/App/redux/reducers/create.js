import { 
    ADD_QUESTION, 
    RESET_QUESTION 
} from "../actions/actionTypes"

const initilState = {
    quiz: []
}

export default function createReducer(state = initilState, action) {
    switch (action.type) {
        case ADD_QUESTION: 
            return {
                ...state,
                quiz: [...state.quiz, action.item]
            }
        case RESET_QUESTION: 
            return {
                ...state,
                quiz: []
            }
        default:
            return state
    }
}