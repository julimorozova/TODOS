import React, {memo, useCallback} from "react";
import {TodoListHeader} from "../TodoListHeader/TodoListHeader";
import {Task} from "../Task/Task";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Button, ButtonGroup, List} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    FilterValueType,
    removeTodolistTC, TodolistDomainType
} from "../../state/todolists-reducer";
import {addTaskTC} from "../../state/tasks-reducer";
import {AppRootStateType} from "../../state/store";
import {TaskStatuses, TaskType} from "../../api/todolist-api";

export const TodoList: React.FC<TodoListPropsType> = memo(({todoListId}) => {
    const todolist = useSelector<AppRootStateType, TodolistDomainType>(state => state.todolists.filter(tl => tl.id === todoListId)[0])
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoListId]);

    const dispatch = useDispatch()

    const setFilterValue = useCallback((filter: FilterValueType) => () => dispatch(changeTodoListFilterAC(todoListId, filter)), [dispatch, todoListId])
    const setTitleValue = useCallback((title: string) => dispatch(changeTodoListTitleTC(todoListId, title)), [todoListId, dispatch])
    const removeTodolist = useCallback(() => dispatch(removeTodolistTC(todoListId)), [todoListId, dispatch])
    const addNewTask = useCallback((title: string) => dispatch(addTaskTC(title, todoListId)), [dispatch, todoListId])

    const getTasksForRender = (tasks: Array<TaskType>, filter: FilterValueType): Array<TaskType> => {
        let newTasks;
        switch (filter) {
            case "active":
                newTasks = tasks.filter(t => t.status === TaskStatuses.New)
                return newTasks
            case "completed":
                newTasks = tasks.filter(t => t.status === TaskStatuses.Completed)
                return newTasks
            default:
                return tasks
        }
    }
    const tasksComponents = getTasksForRender(tasks, todolist.filter).map(item => {
        return (
            <Task
                todolistId={todoListId}
                key={item.id}
                id={item.id}/>)
    });
    return (
        <div className={"todolist"}>
            <TodoListHeader
                title={todolist.title}
                removeTodoList={removeTodolist}
                changeTitle={setTitleValue}
                entityStatus={todolist.entityStatus}
            />
            <AddItemForm
                disabled={todolist.entityStatus === "loading"}
                addItem={addNewTask}
                label={"Add a task"}/>
            <List>
                {tasksComponents}
            </List>
            <ButtonGroup
                color={"primary"}
                size={"small"}
                className={"buttonGroup"}
                fullWidth
                style={{marginTop: "10px"}}>
                <Button
                    variant={todolist.filter === "all" ? "contained" : "outlined"}
                    onClick={setFilterValue("all")}>all</Button>
                <Button
                    variant={todolist.filter === "active" ? "contained" : "outlined"}
                    onClick={setFilterValue("active")}>active</Button>
                <Button
                    variant={todolist.filter === "completed" ? "contained" : "outlined"}
                    onClick={setFilterValue("completed")}>done</Button>
            </ButtonGroup>
        </div>
    );
});

type TodoListPropsType = {
    todoListId: string
}
