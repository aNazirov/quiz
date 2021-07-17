import axios from "axios"
import { keys } from "../../../config/keys";
import { AUTH_SUCCESS, AUTO_LOGOUT } from "./actionTypes"

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}
export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000);
    }
}
export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) return dispatch(logout())

        const expiresIn = new Date(localStorage.getItem('expiresIn'))

        if (expiresIn <= new Date()) return  dispatch(logout())
        
        dispatch(authSuccess(token))
        dispatch(autoLogout((expiresIn.getTime() - new Date().getTime()) / 1000))
    }
}
export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expiresIn')
    return {
        type: AUTO_LOGOUT
    }
}

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password, 
            returnSecureToken: true
        }
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${keys.key}`
        if (isLogin) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${keys.key}`
        }
        try {
            const res = await axios.post(url, authData)
            const data = res.data
            const expiresIn = new Date(new Date().getTime() + data.expiresIn * 1000)

            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('expiresIn', expiresIn)

            dispatch(authSuccess(data.idToken))
            dispatch(autoLogout(data.expiresIn))
        } catch (error) {
            console.log(error)
        }
    }
}