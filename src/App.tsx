import React from 'react';
import './App.css';
import { TodoList } from "./components/TodoList/TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    // BLL:
    const todoListTitle_1: string = "What to learn"
    const todoListTitle_2: string = "What to buy"

    const tasks1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]
    const tasks2: Array<TaskType> = [
        {id: 4, title: "Milk", isDone: true},
        {id: 5, title: "Vine", isDone: false},
        {id: 6, title: "Tomatoes", isDone: false},
    ]

    // UI:
    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks1}/>
            <TodoList title={todoListTitle_2} tasks={tasks2}/>
        </div>
    );
}
export default App;
