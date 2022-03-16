import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { TodoListHeader } from "../TodoListHeader/TodoListHeader";
import { Button } from "../Button/Button";
import { FilterValueType, TaskType } from "../../App";
import { Task } from "../Task/Task";


type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValueType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    filter: FilterValueType
}

export const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const addTask = () => {
        if(title.trim() !== "") {
            props.addTask(title.trim(), props.id);
            setTitle("");
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if(e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    const tasksComponents = props.tasks.map(item => {
        return (
            <Task
                key = { item.id }
                { ...item }
                removeTask = { props.removeTask }
                changeTaskStatus = {props.changeTaskStatus }
            />
        )
    });
    return (
        <div>
            <TodoListHeader title = { props.title } />
            <div>
                <input
                    value = { title }
                    onChange = { onChangeHandler }
                    onKeyPress = { onKeyPressHandler }
                    className={error ? "error" : ""}
                />
                <button onClick = { addTask }>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                { tasksComponents }

                { /*<Task key={props.tasks[0].id} {...props.tasks[0]} />
                <Task key={props.tasks[1].id} {...props.tasks[1]} />
                <Task key={props.tasks[2].id} {...props.tasks[2]} /> */}

                {/* <li key={props.tasks[0].id}>
                    <input type="checkbox" checked={props.tasks[0].isDone}/>
                    <span>{props.tasks[0].title}</span>
                </li>
                <li key={props.tasks[1].id}>
                    <input type="checkbox" checked={props.tasks[1].isDone}/>
                    <span>{props.tasks[1].title}</span>
                </li>
                <li key={props.tasks[2].id}>
                    <input type="checkbox" checked={props.tasks[2].isDone}/>
                    <span>{props.tasks[2].title}</span>
                </li> */}

            </ul>
            <div>
                <Button
                    className = { props.filter === "all" ? "active-filter" : "" }
                    buttonName = "All"
                    onClickHandler = { onAllClickHandler }
                />
                <Button
                    className = { props.filter === "active" ? "active-filter" : "" }
                    buttonName = "Active"
                    onClickHandler = { onActiveClickHandler }
                />
                <Button
                    className = { props.filter === "completed" ? "active-filter" : "" }
                    buttonName = "Completed"
                    onClickHandler = { onCompletedClickHandler }
                />
            </div>
        </div>
    )
}
