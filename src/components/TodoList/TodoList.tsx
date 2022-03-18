import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { TodoListHeader } from "../TodoListHeader/TodoListHeader";
import { Button } from "../Button/Button";
import { FilterValueType, TaskType } from "../../App";
import { Task } from "../Task/Task";


type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValueType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    filter: FilterValueType
    removeTodoList: (todoListID: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const addTask = () => {
        if(title.trim() !== "") {
            props.addTask(title.trim(), props.todoListID);
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

    const onAllClickHandler = () => props.changeFilter("all", props.todoListID);
    const onActiveClickHandler = () => props.changeFilter("active", props.todoListID);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todoListID);

    const removeTodoList = () => props.removeTodoList(props.todoListID)

    const tasksComponents = props.tasks.map(item => {
        const removeTask = (taskID: string) => props.removeTask(taskID, props.todoListID)
        const changeTaskStatus = (taskID: string, isDone: boolean) => props.changeTaskStatus(taskID, isDone, props.todoListID )


        return (
            <Task
                key = { item.id }
                id = { item.id }
                title = { item.title }
                isDone={ item.isDone }
                removeTask = { removeTask }
                changeTaskStatus = { changeTaskStatus }
            />
        )
    });
    return (
        <div>
            <TodoListHeader
                title = { props.title }
                removeTodoList = { removeTodoList }
            />
            // ***
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

            // ***
            <ul>
                { tasksComponents }
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
