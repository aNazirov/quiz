import axiosQuiz from "../../axios/axios-quiz"
import { ADD_QUESTION, RESET_QUESTION } from "./actionTypes"

export function addQuestionHandler(item) {
    return {
        type: ADD_QUESTION,
        item
    }
}
export function resetQuestion() {
    return {
        type: RESET_QUESTION
    }
}
export function createQuizHandler() {
    return async (dispatch, getState) => {
        await axiosQuiz.post('quizes.json', getState().create.quiz)
        dispatch(resetQuestion())
    }
}