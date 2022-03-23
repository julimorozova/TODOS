import React from "react";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import {Delete, DeleteOutline} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

type TodoListHeaderProps = {
    title: string
    removeTodoList: () => void
    changeTitle: (title: string) => void
}
export const TodoListHeader: React.FC<TodoListHeaderProps> = ({title, removeTodoList, changeTitle}: TodoListHeaderProps) => {

    return (
        <h3  style={{textAlign: "center"}}>
            <EditableSpan title={ title } changeTitle={ changeTitle } />
            <IconButton aria-label="delete"
                        onClick={() => removeTodoList()}>
                <DeleteOutline />
            </IconButton>
        </h3>
    )
}

