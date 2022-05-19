import React, {memo} from "react";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {DeleteOutline} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

export const TodoListHeader: React.FC<TodoListHeaderProps> = memo(({title, removeTodoList, changeTitle}) => {
    const remove = () => removeTodoList()
    return (
        <h3 style={{textAlign: "center"}}>
            <EditableSpan title={title} changeTitle={changeTitle}/>
            <IconButton aria-label="delete"
                        onClick={remove}>
                <DeleteOutline/>
            </IconButton>
        </h3>
    )
})

type TodoListHeaderProps = {
    title: string
    removeTodoList: () => void
    changeTitle: (title: string) => void
}

