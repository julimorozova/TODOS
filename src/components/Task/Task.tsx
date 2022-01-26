import React, {ChangeEvent} from "react";

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Task = ({ id, title, isDone, removeTask, changeTaskStatus }: TaskPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(id, newIsDoneValue);
    }
    return (
        <li>
            <input type="checkbox"
                   onChange = { onChangeHandler }
                   checked = { isDone }
            />
            <span>{ title }</span>
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

