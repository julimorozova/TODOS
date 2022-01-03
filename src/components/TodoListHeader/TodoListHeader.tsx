import React from "react";

type TodoListHeaderProps = {
    title: string
}
const TodoListHeader: React.FC<TodoListHeaderProps> = ({title}: TodoListHeaderProps) => {
    return <h3>{title}</h3>
}

export default TodoListHeader;