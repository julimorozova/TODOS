import React from "react";
import TodoListHeader from "../TodoListHeader/TodoListHeader";
import Button from "../Button/Button";

type TodoListProps = {
    title: string
}
function TodoList(props: TodoListProps) {
    return (
        <div>
            <TodoListHeader title={props.title} />
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>
                <li><input type="checkbox" checked={true}/> <span>JS</span></li>
                <li><input type="checkbox" checked={false}/> <span>React</span></li>
            </ul>
            <div>
                <Button buttonName="All" />
                <Button buttonName="Active" />
                <Button buttonName="Completed" />
            </div>
        </div>
    )
}
export default TodoList;