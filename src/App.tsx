import React, {useState} from 'react';
import './App.css';
import { TodoList } from "./components/TodoList/TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValueType = "all" | "active" | "completed"

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
    // функция для изменения state
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Rest api", isDone: false},
        {id: 5, title: "Vue", isDone: true},
    ])
    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(task => task.id !== taskID)) // true || false
    }
    
    const [filter, setFilter] = useState<FilterValueType>("all");
    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

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
    // UI:
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}
export default App;
