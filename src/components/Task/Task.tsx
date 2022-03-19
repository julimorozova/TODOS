import React, {ChangeEvent} from "react";
import { EditableSpan } from "../EditableSpan/EditableSpan";

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Task = ({ id, title, isDone, removeTask, changeTaskStatus, changeTaskTitle }: TaskPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(id, newIsDoneValue);
    }
    const changeTitle = (title: string) => changeTaskTitle(id, title)

    return (
        <li className = {isDone ? "is-done" : "" }>
            <input type="checkbox"
                   onChange = { onChangeHandler }
                   checked = { isDone }
            />
            <EditableSpan
                title={ title }
                changeTitle={ changeTitle }
            />
            <button onClick={() => removeTask(id)}>x</button>
        </li>
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

