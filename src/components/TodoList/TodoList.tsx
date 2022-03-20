import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {TodoListHeader} from "../TodoListHeader/TodoListHeader";
import {FilterValueType, TaskType} from "../../App";
import {Task} from "../Task/Task";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Button, ButtonGroup} from "@material-ui/core";


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
    const setTitleValue = (title: string) => props.changeTodoListTitle(title, props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const addTask = (title: string) => props.addTask(title, props.todoListID)

    const tasksComponents = props.tasks.map(item => {
        const removeTask = (taskID: string) => props.removeTask(taskID, props.todoListID)
        const changeTaskStatus = (taskID: string, isDone: boolean) => props.changeTaskStatus(taskID, isDone, props.todoListID)
        const changeTaskTitle = (taskID: string, title: string) => props.changeTaskTitle(taskID, props.todoListID, title)

        return (
            <Task
                key={item.id}
                id={item.id}
                title={item.title}
                isDone={item.isDone}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />
        )
    });

    return (
        <div className={"todolist"}>
            <TodoListHeader
                title={props.title}
                removeTodoList={removeTodoList}
                changeTitle={setTitleValue}
            />

            <AddItemForm
                addItem={addTask}
                label={"Enter a task"}
            />

            <div>
                {tasksComponents}
            </div>
            <ButtonGroup
                color={"primary"}
                size={"small"}
                className={"buttonGroup"}
            >
                <Button
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    onClick={setFilterValue("all")}>all</Button>
                <Button
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    onClick={setFilterValue("active")}>active</Button>
                <Button
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    onClick={setFilterValue("completed")}>completed</Button>
            </ButtonGroup>
        </div>
    )
}
