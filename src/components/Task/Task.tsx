import React from "react";

type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}
const Task = ({id, title, isDone}: TaskPropsType) => {
    return (
        <li key={id}>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
        </li>
    )
}

export default Task;