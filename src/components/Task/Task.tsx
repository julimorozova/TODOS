import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";
import {TaskStatuses, TaskType} from "../../api/todolist-api";

type TaskPropsType = {
    id: string
    todolistId: string
}

export const Task = ({id, todolistId}: TaskPropsType) => {

    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId].filter(task => task.id === id)[0])

    const dispatch = useDispatch()

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId))
    }, [dispatch, id, todolistId])

    const changeTitle = useCallback((title: string) => dispatch(changeTaskTitleAC(id, title, todolistId)), [id, dispatch, todolistId])
    const removeTask = useCallback(() => dispatch(removeTaskAC(id, todolistId)), [dispatch, todolistId, id ])

    return (
        <ListItem divider>
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
                <DeleteOutline />
            </IconButton>
        </ListItem>
    )
}

/*export const Task: React.FC<TaskPropsType> = ({
      id,
      title,
      isDone,
    }) => {
    return (
        <li>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
        </li>
    )
}*/

