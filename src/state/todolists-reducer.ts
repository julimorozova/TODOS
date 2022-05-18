import {todolistAPI, TodolistType} from "../api/todolist-api";
import {AppThunk} from "./store";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    todolist: TodolistType
}
export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValueType
}
export type SetTodolistsAT = ReturnType<typeof SetTodolistsAC>
export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}

export type ActionTypeTodolist = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | SetTodolistsAT

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (todoLists = initialState, action: ActionTypeTodolist): Array<TodolistDomainType> => {
    switch (action.type) {
        case("REMOVE-TODOLIST"):
            return todoLists.filter(tl => tl.id !== action.id)
        case("ADD-TODOLIST"):
            const newTodolist: TodolistDomainType = {
                ...action.todolist,
                filter: "all",
            }
            return [...todoLists, newTodolist]
        case("CHANGE-TODOLIST-TITLE"):
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case("CHANGE-TODOLIST-FILTER"):
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS":
            return  action.todolists.map(t => {
                return {...t, filter: "all"}
            })
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
    return  {
        type: "REMOVE-TODOLIST",
        id: id
    }
}

export const AddTodoListAC = (todolist: TodolistType): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        todolist
    }
}

export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id: id,
        title: title
    }
}

export const ChangeTodoListFilterAC = (id: string, filter: FilterValueType): ChangeTodoListFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: id,
        filter: filter
    }
}

export const SetTodolistsAC = (todolists: Array<TodolistType>) => {
    return {
        type: "SET-TODOLISTS",
        todolists
    } as const
}


export const fetchTodolistsTC = (): AppThunk => {
    return dispatch => {
        todolistAPI.getTodolists()
            .then(res => {
                dispatch(SetTodolistsAC(res.data))
            })
    }
}


export const _fetchTodolistsTC = (): AppThunk => async dispatch => {
    const res = await todolistAPI.getTodolists()
    dispatch(SetTodolistsAC(res.data))
}

export const removeTodolistTC = (todolistId: string): AppThunk => dispatch => {
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(RemoveTodoListAC(todolistId))
        })
}
export const addTodolistTC = (title: string): AppThunk => dispatch => {
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(AddTodoListAC(res.data.data.item))
        })
}

export const changeTodoListTitleTC = (id: string, title: string): AppThunk => dispatch => {
    todolistAPI.updateTodolist(id, title)
        .then(res => {
            dispatch(ChangeTodoListTitleAC(id, title))
        })
}
