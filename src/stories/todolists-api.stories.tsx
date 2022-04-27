import React, {useEffect, useState} from 'react';
import {taskAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist("New todo")
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'a2427004-53fc-4ff6-8b8a-650ae4a50ca7';
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'f3b1a773-fbab-430b-b88a-7510a2b74174';
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'f3b1a773-fbab-430b-b88a-7510a2b74174';
    useEffect(() => {
        taskAPI.getTasks(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'f3b1a773-fbab-430b-b88a-7510a2b74174';
    const title = 'HTML'
    useEffect(() => {
        taskAPI.createTask(todolistId, title)
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'f3b1a773-fbab-430b-b88a-7510a2b74174';
    const taskId = '3c7c039d-ec02-48ba-b875-49a8854044aa'
    useEffect(() => {
        taskAPI.updateTask(todolistId, taskId,'I am new title')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'f3b1a773-fbab-430b-b88a-7510a2b74174';
    const taskId = '0b1f76a2-50ab-4670-bdeb-3fc097d3745f'
    useEffect(() => {
        taskAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
