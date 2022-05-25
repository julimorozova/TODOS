import {
    ADD_TODOLIST,
    AddTodoListAT, ClearDataAT, REMOVE_TODOLIST,
    RemoveTodoListAT, SET_TODOLISTS,
    SetTodolistsAT,
} from "./todolists-reducer";
import {taskAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/todolist-api";
import {AppRootStateType, AppThunk} from "./store";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setAppStatusAC} from "./app-reduser";

const REMOVE_TASK = "REMOVE_TASK"
const ADD_TASK = "ADD_TASK"
const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS"
const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE"
const SET_TASKS = "SET_TASKS"

const initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionTypeTask): TaskStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        case ADD_TASK:
            return {
                ...state,
                [action.todolistId]: [action.task, ...state[action.todolistId]]
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId
                    ? {...task, status: action.status} : task)
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId
                    ? {...task, title: action.title} : task)
            }
        case ADD_TODOLIST:
            return {
                ...state,
                [action.todolist.id]: []
            }
        case REMOVE_TODOLIST: {
            const newState = {...state}
            delete newState[action.id]
            return newState
        }
        case SET_TODOLISTS: {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState
        }
        case SET_TASKS:
            return {
                ...state,
                [action.todolistId]: [...action.tasks]
            }
        case "CLEAR_DATA":
            return {}
        default:
            return state
    }
}
// ####################################
// action creators

export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: REMOVE_TASK, taskId, todolistId
}) as const

export const addTaskAC = (task: TaskType, todolistId: string) => ({
    type: ADD_TASK, task, todolistId
}) as const

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string) => ({
    type: CHANGE_TASK_STATUS, taskId, status, todoListId
}) as const

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => ({
    type: CHANGE_TASK_TITLE, taskId, title, todoListId
}) as const

export const SetTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: SET_TASKS, tasks, todolistId
}) as const

// ####################################
// thunks

export const fetchTasksTC = (todolistId: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    taskAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(SetTasksAC(res.data.items, todolistId))
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
}

export const deleteTaskTC = (taskId: string, todolistId: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    taskAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(removeTaskAC(taskId, todolistId))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
}

export const addTaskTC = (title: string, todolistId: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    taskAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(addTaskAC(res.data.data.item, todolistId))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
}

export const changeTaskTitleTC = (taskId: string, title: string, todoListId: string): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todoListId].find(task => task.id === taskId)
        if (!task) return
        const model: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            startDate: task.startDate,
            priority: task.priority,
            status: task.status,
            title
        }
        dispatch(setAppStatusAC('loading'))
        taskAPI.updateTask(todoListId, taskId, model)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(changeTaskTitleAC(taskId, title, todoListId))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err.message, dispatch)
            })
    }

export const changeTaskStatusTC = (taskId: string, status: TaskStatuses, todoListId: string): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todoListId].find(task => task.id === taskId)
        if (!task) return
        const model: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            startDate: task.startDate,
            title: task.title,
            priority: task.priority,
            status
        }
        dispatch(setAppStatusAC('loading'))
        taskAPI.updateTask(todoListId, taskId, model)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(changeTaskStatusAC(taskId, status, todoListId))
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

export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

export type ActionTypeTask =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof SetTasksAC>
    | RemoveTodoListAT
    | AddTodoListAT
    | SetTodolistsAT
    | ClearDataAT



