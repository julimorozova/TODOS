import React from "react";

type TodoListHeaderProps = {
    title: string
}
const TodoListHeader = (props: TodoListHeaderProps) => {
    return <h3>{props.title}</h3>
}

export default TodoListHeader;