import React, {useCallback} from "react";
import {TodoListHeader} from "../TodoListHeader/TodoListHeader";
import {FilterValueType, TaskType} from "../../AppWithRedux";
import {Task} from "../Task/Task";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Button, ButtonGroup, List} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "../../state/todolists-reducer";
import {addTaskAC} from "../../state/tasks-reducer";


type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
}

export const TodoList: React.FC<TodoListPropsType> = React.memo(({todoListId, ...props}) => {
    console.log("TodoList")


    const dispatch = useDispatch()

    const setFilterValue = useCallback((filter: FilterValueType) => () => dispatch(ChangeTodoListFilterAC(todoListId, filter)), [dispatch, todoListId])

    const setTitleValue = useCallback((title: string) => dispatch(ChangeTodoListTitleAC(todoListId, title)),[todoListId, dispatch])

    const removeTodolist = useCallback(() => dispatch(RemoveTodoListAC(todoListId)), [todoListId, dispatch])

    const addNewTask = useCallback((title: string) => dispatch(addTaskAC(title, todoListId)), [dispatch, todoListId])

    const getTasksForRender = (tasks: Array<TaskType>, filter: string): Array<TaskType> => {
        let newTasks;
        switch (filter) {
            case "active":

                newTasks = tasks.filter(t => !t.isDone)
                return newTasks
            case "completed":
                newTasks = tasks.filter(t => t.isDone)
                return newTasks
            default:
                return tasks
        }
    }

    const tasksComponents = getTasksForRender(props.tasks, props.filter).map(item => {

        return (
            <Task
                todolistId={todoListId}
                key={item.id}
                id={item.id}
            />
        )
    });
    return (
        <div className={"todolist"}>
            <TodoListHeader
                title={props.title}
                removeTodoList={removeTodolist}
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
