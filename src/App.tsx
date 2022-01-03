import React from 'react';
import './App.css';
import TodoList from "./TodoList";

function App() {
    return (
        <div className="App">
            <TodoList title="What to learn" />
            <TodoList title="Songs"/>
            <TodoList title="Books"/>
        </div>
    );
}
export default App;
