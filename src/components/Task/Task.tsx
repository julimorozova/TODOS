import React from "react";

type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
    removeTask: (taskID: number) => void
}

export const Task = ({id, title, isDone, removeTask}: TaskPropsType) => {
    return (
        <li>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
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

