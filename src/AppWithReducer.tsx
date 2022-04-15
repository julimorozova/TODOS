import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {TodoListHeader} from "./components/TodoListHeader/TodoListHeader";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

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

export const AppWithReducer = () => {
    // BLL:

    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const todoListID_3 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {
            id: todoListID_1,
            title: "What to learn",
            filter: "all"
        },
        {
            id: todoListID_2,
            title: "What to buy",
            filter: "all"
        },
        {
            id: todoListID_3,
            title: "What to sell",
            filter: "all"
        }
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rest api", isDone: false},
            {id: v1(), title: "Vue", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Apple", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
        ],
        [todoListID_3]: [
            {id: v1(), title: "Table", isDone: true},
            {id: v1(), title: "MacBook", isDone: false},
            {id: v1(), title: "Flat", isDone: false},
        ]
    })


    const changeFilter = (filter: FilterValueType, todoListId: string) => {
        dispatchToTodoLists(ChangeTodoListFilterAC(todoListId, filter))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatchToTodoLists(ChangeTodoListTitleAC(todoListId, title))
    }
    const removeTodoList = (todoListId: string) => {
        const action = RemoveTodoListAC(todoListId)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    const addTodoList = (title: string) => {
        const action = AddTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const addTask = (title: string, todoListId: string) => {
        dispatchToTasks(addTaskAC(title, todoListId))
    }
    const removeTask = (taskId: string, todoListId: string) => {
        let action = removeTaskAC(taskId, todoListId)
        dispatchToTasks(action)
    }
    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }
     const changeTaskTitle = (taskId: string, todoListId: string, title: string) => {
         dispatchToTasks(changeTaskTitleAC(taskId, title, todoListId))
    }



    const getTasksForRender = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        const tasksForRender = getTasksForRender(tl);

        return (
            <Grid item key={tl.id}>
                <Paper elevation={3}>
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasksForRender}
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

    // UI:
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

