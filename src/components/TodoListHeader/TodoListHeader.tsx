import React from "react";

type TodoListHeaderProps = {
    title: string
}
export const TodoListHeader: React.FC<TodoListHeaderProps> = ({title}: TodoListHeaderProps) => {
    return <h3>{title}</h3>
}

