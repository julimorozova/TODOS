import {v1} from "uuid";
import {TodolistType} from "../api/todolist-api";


export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    id: string
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
export type SetTodolistAT = ReturnType<typeof SetTodolistAC>
export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}

export type ActionType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | SetTodolistAT

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (todoLists = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case("REMOVE-TODOLIST"):
            return todoLists.filter(tl => tl.id !== action.id)
        case("ADD-TODOLIST"):
            const newTodolist: TodolistDomainType = {
                id: action.id,
                title: action.title,
                filter: "all",
                addedDate: "",
                order: 0
            }
            return [...todoLists, newTodolist]
        case("CHANGE-TODOLIST-TITLE"):
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case("CHANGE-TODOLIST-FILTER"):
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLIST":
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

export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        id: v1(),
        title: title
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

export const SetTodolistAC = (todolists: Array<TodolistType>) => {
    return {
        type: "SET-TODOLIST",
        todolists
    } as const
}

