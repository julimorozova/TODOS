import React, {useCallback} from "react";
import {TodoListHeader} from "../TodoListHeader/TodoListHeader";
import {FilterValueType, TaskType} from "../../App";
import {Task} from "../Task/Task";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Button, ButtonGroup, List} from "@material-ui/core";


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

export const TodoList: React.FC<TodoListPropsType> = React.memo(({todoListID, addTask, ...props}) => {
    console.log("TodoList")
    const setFilterValue = (filter: FilterValueType) => () => props.changeFilter(filter, todoListID)
    const setTitleValue = (title: string) => props.changeTodoListTitle(title, todoListID)
    const removeTodoList = () => props.removeTodoList(todoListID)
    const addNewTask = useCallback((title: string) => addTask(title, todoListID), [addTask, todoListID])

    const getTasksForRender = (): Array<TaskType> => {
        let newTasks;
        switch (props.filter) {
            case "active":
                newTasks = props.tasks.filter(t => !t.isDone)
                return newTasks
            case "completed":
                newTasks = props.tasks.filter(t => t.isDone)
                return newTasks
            default:
                return props.tasks
        }
    }

    const tasksComponents = getTasksForRender().map(item => {
        const removeTask = (taskID: string) => props.removeTask(taskID, todoListID)
        const changeTaskStatus = (taskID: string, isDone: boolean) => props.changeTaskStatus(taskID, isDone, todoListID)
        const changeTaskTitle = (taskID: string, title: string) => props.changeTaskTitle(taskID, todoListID, title)

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
                addItem={addNewTask}
                label={"Enter a task"}
            />

            <List>
                {tasksComponents}
            </List>
            <ButtonGroup
                color={"primary"}
                size={"small"}
                className={"buttonGroup"}
                fullWidth
                style={{marginTop: "10px"}}
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
    );
});
