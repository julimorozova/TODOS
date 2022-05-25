import {authAPI, LoginParamsType} from "../api/todolist-api";
import {AppThunk} from "./store";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setAppStatusAC} from "./app-reduser";
import {clearDataAC} from "./todolists-reducer";

const initialState: InitialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialState = initialState, action: ActionTypeAuth) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

export const setIsLoggedInAC = (isLoggedIn: boolean) =>
    ({type: 'LOGIN', isLoggedIn}) as const

export const loginTC = (data: LoginParamsType): AppThunk => {
    return (dispatch => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err.message, dispatch)
            })
    })
}

export const logoutTC = (): AppThunk => {
    return (dispatch => {
        dispatch(setAppStatusAC('loading'))
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(false))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(clearDataAC())
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err.message, dispatch)
            })
    })
}

type InitialState = {
    isLoggedIn: boolean
}
export type ActionTypeAuth = ReturnType<typeof setIsLoggedInAC>
