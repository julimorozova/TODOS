import {AppThunk} from "./store";
import {setIsLoggedInAC} from "./auth-reducer";
import {authAPI} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";

const APP_SET_STATUS = "APP_SET_STATUS"
const APP_SET_ERROR = "APP_SET_ERROR"
const APP_SET_IS_INITIALIZED = "APP_SET_IS_INITIALIZED"

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as NullableType<string>,
    isInitialized: false as boolean
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsTypeApp): InitialStateType => {
    switch (action.type) {
        case APP_SET_STATUS:
            return {...state, status: action.status}
        case APP_SET_ERROR:
            return {...state, error: action.error}
        case APP_SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

// action creators
export const setAppStatusAC = (status: RequestStatusType) => ({
    type: APP_SET_STATUS, status
}) as const

export const setAppErrorAC = (error: NullableType<string>) => ({
    type: APP_SET_ERROR, error
}) as const

export const setIsInitializedAC = (isInitialized: boolean) => ({
    type: APP_SET_IS_INITIALIZED, isInitialized
}) as const

// thunks
export const initializeAppTC = (): AppThunk =>
    (dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}

// types
export type ActionsTypeApp =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>
export type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type NullableType<T> = null | T
