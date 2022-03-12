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
export type TodoListsType = Array<TodoListType>
function App() {
    // BLL:
    const todoListTitle: string = "What to learn";

    /*let tasks: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Rest api", isDone: false},
        {id: 5, title: "Vue", isDone: true},
    ]
    */
    const [todoLists, setTodoLists] = useState<TodoListsType>([
        {
            id: v1(),
            title: "What to learn",
            filter: "all"
        },
        {
            id: v1(),
            title: "What to buy",
            filter: "all"
        }
    ])
    // функция для изменения state
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Rest api", isDone: false},
        {id: v1(), title: "Vue", isDone: false},
    ])
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID)) // true || false
    }

    const [filter, setFilter] = useState<FilterValueType>("all");
    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }
    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks: Array<TaskType> = [task, ...tasks] // new Array
        setTasks(newTasks)
    }
    // console.log(tasks)
    const getTasksForRender = () => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }
    const tasksForRender = getTasksForRender();

    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find( t => t.id === taskId )
        if(task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])
    }

    // UI:
    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title = { tl.title }
                        tasks = { tasksForRender }
                        removeTask = { removeTask }
                        changeFilter={ changeFilter }
                        addTask = { addTask }
                        changeTaskStatus = { changeStatus }
                        filter = {tl.filter}
                    />
                })
            }
            {/*<TodoList*/}
            {/*    title = { todoListTitle }*/}
            {/*    tasks = { tasksForRender }*/}
            {/*    removeTask = { removeTask }*/}
            {/*    changeFilter={ changeFilter }*/}
            {/*    addTask = { addTask }*/}
            {/*    changeTaskStatus = { changeStatus }*/}
            {/*    filter = {filter}*/}
            {/*/>*/}
        </div>
    );
}
export default App;
