import React, {ChangeEvent} from "react";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {Delete, DeleteOutline} from "@material-ui/icons";

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Task = ({id, title, isDone, removeTask, changeTaskStatus, changeTaskTitle}: TaskPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(id, newIsDoneValue);
    }
    const changeTitle = (title: string) => changeTaskTitle(id, title)

    return (
        <ListItem divider>
            <span className={isDone ? "is-done" : ""}>
                <Checkbox
                    onChange={onChangeHandler}
                    checked={isDone}
                    color={"primary"}
                />
                <EditableSpan
                    title={title}
                    changeTitle={changeTitle}
                />
            </span>
            <IconButton aria-label="delete"
                        size={"small"}
                        onClick={() => removeTask(id)}>
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

