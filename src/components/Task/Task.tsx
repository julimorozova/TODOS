import React, {ChangeEvent} from "react";

type TaskPropsType = {
    id: string
    todoListID: string
    title: string
    isDone: boolean
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
}

export const Task = ({ id, title,todoListID, isDone, removeTask, changeTaskStatus }: TaskPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(id, newIsDoneValue, todoListID);
    }
    return (
        <li className = {isDone ? "is-done" : "" }>
            <input type="checkbox"
                   onChange = { onChangeHandler }
                   checked = { isDone }
            />
            <span>{ title }</span>
            <button onClick={() => removeTask(id, todoListID)}>x</button>
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

