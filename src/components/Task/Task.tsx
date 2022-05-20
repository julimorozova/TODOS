import React, {ChangeEvent, memo, useCallback} from "react";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
    changeTaskStatusTC,
    changeTaskTitleTC,
    deleteTaskTC
} from "../../state/tasks-reducer";
import {TaskStatuses, TaskType} from "../../api/todolist-api";

export const Task: React.FC<TaskPropsType> = memo(({id, todolistId}) => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId].filter(task => task.id === id)[0])
    const dispatch = useDispatch()

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusTC(id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId))
    }, [dispatch, id, todolistId])
    const changeTitle = useCallback((title: string) => dispatch(changeTaskTitleTC(id, title, todolistId)), [id, dispatch, todolistId])
    const removeTask = useCallback(() => dispatch(deleteTaskTC(id, todolistId)), [dispatch, todolistId, id])

    return (
        <ListItem divider style={{justifyContent: "space-between"}}>
            <span className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
                <Checkbox
                    onChange={onChangeHandler}
                    checked={task.status === TaskStatuses.Completed}
                    color={"primary"}
                />
                <EditableSpan
                    title={task.title}
                    changeTitle={changeTitle}
                />
            </span>
            <IconButton aria-label="delete"
                        size={"small"}
                        onClick={removeTask}>
                <DeleteOutline/>
            </IconButton>
        </ListItem>
    )
})

type TaskPropsType = {
    id: string
    todolistId: string
}


