import { Dispatch } from 'redux';
import {setAppErrorAC, setAppStatusAC} from "../state/app-reduser";
import {ResponseType} from "../api/todolist-api";
import {ActionType} from "../state/store";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch:  Dispatch<ActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (message: string, dispatch:  Dispatch<ActionType>) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

