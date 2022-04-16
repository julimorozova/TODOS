import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

export const AppWithRedux = () => {
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)

    const dispatch = useDispatch()

    const changeFilter = useCallback((filter: FilterValueType, todoListId: string) => {
        dispatch(ChangeTodoListFilterAC(todoListId, filter))
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        dispatch(ChangeTodoListTitleAC(todoListId, title))
    }, [dispatch])
    const removeTodoList = useCallback((todoListId: string) => {
        const action = RemoveTodoListAC(todoListId)
        dispatch(action)
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch])
    const removeTask = useCallback((taskId: string, todoListId: string) => {
        let action = removeTaskAC(taskId, todoListId)
        dispatch(action)
    }, [dispatch])
    const changeStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }, [dispatch])
     const changeTaskTitle = useCallback((taskId: string, todoListId: string, title: string) => {
         dispatch(changeTaskTitleAC(taskId, title, todoListId))
    }, [dispatch])


    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={3}>
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTodoListTitle={changeTodoListTitle}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                </Paper>
            </Grid>
        )

    })

    return (
        <div>
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "25px 0"}}>
                    <AddItemForm
                        addItem={addTodoList}
                        label={"Enter a new TodoList"}
                    />
                </Grid>
                <Grid container spacing={4}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

