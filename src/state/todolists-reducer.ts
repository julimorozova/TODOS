import {todolistAPI, TodolistType} from "../api/todolist-api";
import {AppThunk} from "./store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reduser";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export const REMOVE_TODOLIST = "REMOVE_TODOLIST"
export const ADD_TODOLIST = "ADD_TODOLIST"
export const SET_TODOLISTS = "SET_TODOLISTS"
const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE"
const CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER"
const CHANGE_TODOLIST_ENTITY_STATUS = "CHANGE_TODOLIST_ENTITY_STATUS"

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (todoLists = initialState, action: ActionTypeTodolist): Array<TodolistDomainType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return todoLists.filter(tl => tl.id !== action.id)
        case ADD_TODOLIST:
            return [...todoLists, {
                ...action.todolist,
                filter: "all",
                entityStatus: "idle"

            }]
        case CHANGE_TODOLIST_TITLE:
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case CHANGE_TODOLIST_FILTER:
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case SET_TODOLISTS:
            return action.todolists.map(t => {
                return {...t, filter: "all", entityStatus: "idle"}
            })
        case CHANGE_TODOLIST_ENTITY_STATUS:
            return todoLists.map(tl => tl.id === action.id
                ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return todoLists
    }
}

// ####################################
// action creators

export const removeTodoListAC = (id: string) => ({
    type: REMOVE_TODOLIST, id: id
}) as const

export const addTodoListAC = (todolist: TodolistType) => ({
    type: ADD_TODOLIST, todolist
}) as const

export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: CHANGE_TODOLIST_TITLE, id, title
}) as const

export const changeTodoListFilterAC = (id: string, filter: FilterValueType) => ({
    type: CHANGE_TODOLIST_FILTER, id, filter
}) as const

export const setTodolistsAC = (todolists: Array<TodolistType>) => ({
    type: SET_TODOLISTS, todolists
}) as const

export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: CHANGE_TODOLIST_ENTITY_STATUS, id, entityStatus
}) as const

// ####################################
// thunks

export const fetchTodolistsTC = (): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTodolistsAC(res.data))
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
    })
}

export const removeTodolistTC = (todolistId: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
                dispatch(removeTodoListAC(todolistId))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
    })
}

export const addTodolistTC = (title: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(addTodoListAC(res.data.data.item))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
}

export const changeTodoListTitleTC = (id: string, title: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(id, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodoListTitleAC(id, title))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
}

// ####################################
// types

export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>

export type ActionTypeTodolist =
    | RemoveTodoListAT
    | AddTodoListAT
    | SetTodolistsAT
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

