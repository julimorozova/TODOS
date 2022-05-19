import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistTC, fetchTodolistsTC, TodolistDomainType
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export const App = () => {
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const dispatch = useDispatch()

    useEffect( () => {
       dispatch(fetchTodolistsTC())
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={3}>
                    <TodoList
                        todoListId={tl.id}
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

