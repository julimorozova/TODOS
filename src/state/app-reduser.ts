const APP_SET_STATUS = "APP_SET_STATUS"
const APP_SET_ERROR = "APP_SET_ERROR"

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as NullableType<string>
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsTypeApp): InitialStateType => {
    switch (action.type) {
        case APP_SET_STATUS:
            return {...state, status: action.status}
        case APP_SET_ERROR:
            return {...state, error: action.error}
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


// types
export type ActionsTypeApp =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type NullableType<T> = null | T
