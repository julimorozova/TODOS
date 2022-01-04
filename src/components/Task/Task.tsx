import React from "react";

type TaskPropsType = {
    //id: number
    title: string
    isDone: boolean
}
export const Task = ({title, isDone}: TaskPropsType) => {
    return (
        <li>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
        </li>
    )
}

