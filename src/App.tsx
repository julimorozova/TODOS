import React, { useState } from 'react';
import './App.css';
import { TodoList } from "./components/TodoList/TodoList";
import { v1 } from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}
function App() {
    // BLL:

    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const todoListID_3 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todoListID_1,
            title: "What to learn",
            filter: "all"
        },
        {
            id: todoListID_2,
            title: "What to buy",
            filter: "all"
        },
        {
            id: todoListID_3,
            title: "What to sell",
            filter: "all"
        }
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rest api", isDone: false},
            {id: v1(), title: "Vue", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Apple", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
        ],
        [todoListID_3]: [
            {id: v1(), title: "Table", isDone: true},
            {id: v1(), title: "MacBook", isDone: false},
            {id: v1(), title: "Flat", isDone: false},
        ]
    })

    const removeTask = (taskID: string, todoListID: string) => {
        const tasksFromTodoList = tasks[todoListID]
        const filteredTasks = tasksFromTodoList.filter(task => task.id !== taskID)
        const copyTasks = {...tasks}
        copyTasks[todoListID] = filteredTasks
        setTasks({...copyTasks})

        // setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskID)})
    }
    const changeFilter = (filter: FilterValueType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
    }
    const addTask = (title: string, todoListID: string) => {
        let newTask: TaskType = {id: v1(), title, isDone: false}
        const tasksFromTodoList = tasks[todoListID]
        const updateTasks = [newTask, ...tasksFromTodoList]
        const copyTasks = {...tasks}
        copyTasks[todoListID] = updateTasks
        setTasks(copyTasks)

        // setTasks({...tasks, [todoListID]: [newTask, ...tasksFromTodoList]})
    }
    const changeStatus = (taskId: string, isDone: boolean, todoListID: string) => {
        const tasksFromTodoList = tasks[todoListID]
        const updateTasks = tasksFromTodoList.map(t => t.id === taskId ? {...t, isDone} : t)
        const copyTasks = {...tasks}
        copyTasks[todoListID] = updateTasks
        setTasks(copyTasks)

        // setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const getTasksForRender = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        const tasksForRender = getTasksForRender(tl);

        return <TodoList
            key={ tl.id }
            todoListID={ tl.id }
            title = { tl.title }
            tasks = { tasksForRender }
            removeTask = { removeTask }
            changeFilter={ changeFilter }
            addTask = { addTask }
            changeTaskStatus = { changeStatus }
            filter = { tl.filter }
        />
    })

    // UI:
    return (
        <div className="App">
            { todoListsComponents }
        </div>
    );
}
export default App;
