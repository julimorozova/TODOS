import React, {memo} from "react";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import {DeleteOutline} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

type TodoListHeaderProps = {
    title: string
    removeTodoList: () => void
    changeTitle: (title: string) => void
}
export const TodoListHeader: React.FC<TodoListHeaderProps> = memo(({title, removeTodoList, changeTitle}: TodoListHeaderProps) => {
    const remove = () => removeTodoList()
    return (
        <h3  style={{textAlign: "center"}}>
            <EditableSpan title={ title } changeTitle={ changeTitle } />
            <IconButton aria-label="delete"
                        onClick={remove}>
                <DeleteOutline />
            </IconButton>
        </h3>
    )
})

