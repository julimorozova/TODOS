import React from "react";

type TodoListHeaderProps = {
    title: string
    removeTodoList: () => void
}
export const TodoListHeader: React.FC<TodoListHeaderProps> = ({title, removeTodoList}: TodoListHeaderProps) => {
    return (
        <h3>
            {title}
            <button onClick={() => removeTodoList()}>x</button>
        </h3>
    )
}

