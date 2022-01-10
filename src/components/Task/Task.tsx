import React from "react";
import {TaskType} from "../../App";

/*type TaskPropsType = {
    //id: number
    title: string
    isDone: boolean
} */
type TaskPropsType = TaskType & {}

export const Task = ({title, isDone}: TaskPropsType) => {
    return (
        <li>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
        </li>
    )
}

/*export const Task: React.FC<TaskPropsType> = ({
      title,
      isDone}) => {
    return (
        <li>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
        </li>
    )
}*/

