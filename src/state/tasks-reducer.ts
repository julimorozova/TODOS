import {TaskStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

const REMOVE_TASK = "REMOVE_TASK"
const ADD_TASK = "ADD_TASK"
const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS"
const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE"

export type removeTaskAT = {
    type: 'REMOVE_TASK'
    taskId: string
    todolistId: string
}
export type addTaskAT = {
    type: 'ADD_TASK'
    title: string
    todolistId: string
}
export type changeTaskStatusAT = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    status: TaskStatuses
    todoListId: string
}
export type changeTaskTitleAT = {
    type: 'CHANGE_TASK_TITLE'
    taskId: string
    title: string
    todoListId: string
}


export type ActionType = removeTaskAT
    | addTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT

const initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId )}
        case ADD_TASK:
            let newTask: TaskType = {
                id: v1(), title: action.title, status: TaskStatuses.New,
            description: "", completed: "", priority: TaskPriorities.Low, startDate: "",
                deadline: "", todoListId: action.todolistId, order: 0, addedDate: ""
            }
            return {
                ...state, [action.todolistId]:  [newTask, ...state[action.todolistId]]
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id ===  action.taskId
                    ? {...task, status: action.status} : task)
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId
                    ? {...task, title: action.title} : task)
            }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const newState = {...state}
            delete newState[action.id]
            return newState
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskAT => {
    return  { type: REMOVE_TASK, taskId, todolistId }
}

export const addTaskAC = (title: string, todolistId: string): addTaskAT => {
    return  { type: ADD_TASK, title, todolistId }
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string): changeTaskStatusAT => {
    return  { type: CHANGE_TASK_STATUS, taskId, status, todoListId }
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): changeTaskTitleAT => {
    return  { type: CHANGE_TASK_TITLE, taskId, title, todoListId }
}




