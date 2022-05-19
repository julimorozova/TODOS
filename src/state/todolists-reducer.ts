import {todolistAPI, TodolistType} from "../api/todolist-api";
import {AppThunk} from "./store";

export const REMOVE_TODOLIST = "REMOVE_TODOLIST"
export const ADD_TODOLIST = "ADD_TODOLIST"
export const SET_TODOLISTS = "SET_TODOLISTS"
const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE"
const CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER"

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (todoLists = initialState, action: ActionTypeTodolist): Array<TodolistDomainType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return todoLists.filter(tl => tl.id !== action.id)
        case ADD_TODOLIST:
            return [...todoLists, {
                ...action.todolist,
                filter: "all",
            }]
        case CHANGE_TODOLIST_TITLE:
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case CHANGE_TODOLIST_FILTER:
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case SET_TODOLISTS:
            return action.todolists.map(t => {
                return {...t, filter: "all"}
            })
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


// ####################################
// thunks

export const fetchTodolistsTC = (): AppThunk => dispatch => {
        todolistAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
}

export const removeTodolistTC = (todolistId: string): AppThunk => dispatch => {
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodoListAC(todolistId))
        })
}

export const addTodolistTC = (title: string): AppThunk => dispatch => {
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}

export const changeTodoListTitleTC = (id: string, title: string): AppThunk => dispatch => {
    todolistAPI.updateTodolist(id, title)
        .then(res => {
            dispatch(changeTodoListTitleAC(id, title))
        })
}

// ####################################
// types

export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
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

