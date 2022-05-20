import Grid from "@material-ui/core/Grid";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import Container from "@material-ui/core/Container";
import React, {useCallback, useEffect} from "react";
import Paper from "@material-ui/core/Paper";
import {TodoList} from "../TodoList/TodoList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addTodolistTC, fetchTodolistsTC, TodolistDomainType} from "../../state/todolists-reducer";

export const Todolists = () => {
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
                    <TodoList todoListId={tl.id}/>
                </Paper>
            </Grid>
        )
    })
    return (
        <Container fixed>
            <Grid container style={{padding: "25px 0"}}>
                <AddItemForm
                    addItem={addTodoList}
                    label={"Create a new todo"}
                />
            </Grid>
            <Grid container spacing={4}>
                {todoListsComponents}
            </Grid>
        </Container>
    )
}
