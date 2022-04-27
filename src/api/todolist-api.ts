import axios, {AxiosResponse} from 'axios'

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type TaskType = {
    description: string
    title: string
    completed: string
    status: string
    priority: string
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a1038b76-ce0b-4e0f-8fa8-c2cb1917e698'
    }
})


export const todolistAPI = {
    createTodolist(title: string) {
        return instance.post<any, AxiosResponse<ResponseType<{ item: TodolistType }>>, {title: string}>(`/todo-lists`, {title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<any, AxiosResponse<ResponseType<{}>>, {title: string}>(`/todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`)
    },
    getTodolists() {
        return instance.get<Array<TodolistType>>(`/todo-lists`)
    }
}
export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<Array<TaskType>>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<any, AxiosResponse<ResponseType<{ item: TaskType }>>, {title: string}>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<any, AxiosResponse<ResponseType<{}>>, {title: string}>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
