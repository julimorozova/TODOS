import React from "react";
import TodoListHeader from "../TodoListHeader/TodoListHeader";
import Button from "../Button/Button";
import {TaskType} from "../../App";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

function TodoList(props: TodoListPropsType) {
    return (
        <div>
            <TodoListHeader title={props.title} />
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>
            </ul>
            <div>
                <Button buttonName="All" />
                <Button buttonName="Active" />
                <Button buttonName="Completed" />
            </div>
        </div>
    )
}
export default TodoList;