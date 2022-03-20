import React from "react";
import { EditableSpan } from "../EditableSpan/EditableSpan";

type TodoListHeaderProps = {
    title: string
    removeTodoList: () => void
    changeTitle: (title: string) => void
}
export const TodoListHeader: React.FC<TodoListHeaderProps> = ({title, removeTodoList, changeTitle}: TodoListHeaderProps) => {

    return (
        <h3>
            <EditableSpan title={ title } changeTitle={ changeTitle } />
            <button onClick={() => removeTodoList()}>x</button>
        </h3>
    )
}

