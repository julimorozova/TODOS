import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { TodoListHeader } from "../TodoListHeader/TodoListHeader";
import { Button } from "../Button/Button";
import { FilterValueType, TaskType } from "../../App";
import { Task } from "../Task/Task";
import {AddItemForm} from "../AddItemForm/AddItemForm";


type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValueType, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, todoListID: string, title: string) => void
    filter: FilterValueType
    removeTodoList: (todoListID: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    const setFilterValue = (filter: FilterValueType) => () => props.changeFilter(filter, props.todoListID)
    const setTitleValue = (title: string) =>  props.changeTodoListTitle(title, props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const addTask = (title: string) => props.addTask(title, props.todoListID)

    const tasksComponents = props.tasks.map(item => {
        const removeTask = (taskID: string) => props.removeTask(taskID, props.todoListID)
        const changeTaskStatus = (taskID: string, isDone: boolean) => props.changeTaskStatus(taskID, isDone, props.todoListID )
        const changeTaskTitle = (taskID: string, title: string) => props.changeTaskTitle(taskID, props.todoListID, title)

        return (
            <Task
                key = { item.id }
                id = { item.id }
                title = { item.title }
                isDone={ item.isDone }
                removeTask = { removeTask }
                changeTaskStatus = { changeTaskStatus }
                changeTaskTitle = { changeTaskTitle }
            />
        )
    });

    return (
        <div>
            <TodoListHeader
                title = { props.title }
                removeTodoList = { removeTodoList }
                changeTitle={ setTitleValue }
            />

            <AddItemForm addItem={ addTask }/>

            <ul>
                { tasksComponents }
            </ul>
            <div>
                <Button
                    className = { props.filter === "all" ? "active-filter" : "" }
                    buttonName = "All"
                    onClickHandler = { setFilterValue("all") }
                />
                <Button
                    className = { props.filter === "active" ? "active-filter" : "" }
                    buttonName = "Active"
                    onClickHandler = { setFilterValue("active") }
                />
                <Button
                    className = { props.filter === "completed" ? "active-filter" : "" }
                    buttonName = "Completed"
                    onClickHandler = { setFilterValue("completed") }
                />
            </div>
        </div>
    )
}
