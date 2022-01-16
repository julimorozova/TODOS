import React from "react";
import { TodoListHeader } from "../TodoListHeader/TodoListHeader";
import { Button } from "../Button/Button";
import { FilterValueType, TaskType} from "../../App";
import { Task } from "../Task/Task";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValueType) => void
}

export const TodoList = (props: TodoListPropsType) => {
    const tasksComponents = props.tasks.map(item => {
        return (
            <Task key={item.id}
                  {...item}
                  removeTask={props.removeTask} />
        )
    });

    return (
        <div>
            <TodoListHeader title={props.title} />
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksComponents}

                { /*<Task key={props.tasks[0].id} {...props.tasks[0]} />
                <Task key={props.tasks[1].id} {...props.tasks[1]} />
                <Task key={props.tasks[2].id} {...props.tasks[2]} /> */}

                {/* <li key={props.tasks[0].id}>
                    <input type="checkbox" checked={props.tasks[0].isDone}/>
                    <span>{props.tasks[0].title}</span>
                </li>
                <li key={props.tasks[1].id}>
                    <input type="checkbox" checked={props.tasks[1].isDone}/>
                    <span>{props.tasks[1].title}</span>
                </li>
                <li key={props.tasks[2].id}>
                    <input type="checkbox" checked={props.tasks[2].isDone}/>
                    <span>{props.tasks[2].title}</span>
                </li> */}

            </ul>
            <div>
                <Button
                    buttonName="All"
                    onClickHandler = {() => props.changeFilter("all")}
                />
                <Button
                    buttonName="Active"
                    onClickHandler = {() => props.changeFilter("active")}
                />
                <Button
                    buttonName="Completed"
                    onClickHandler = {() => props.changeFilter("completed")}
                />
            </div>
        </div>
    )
}
