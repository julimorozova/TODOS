import React, {memo} from "react";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {DeleteOutline} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {RequestStatusType} from "../../state/app-reduser";

export const TodoListHeader: React.FC<TodoListHeaderProps> = memo(({title, removeTodoList, changeTitle, entityStatus}) => {
    const remove = () => removeTodoList()
    return (
        <h3 style={{textAlign: "center"}}>
            <EditableSpan title={title} changeTitle={changeTitle}/>
            <IconButton aria-label="delete"
                        onClick={remove}
            disabled={entityStatus === 'loading'}>
                <DeleteOutline/>
            </IconButton>
        </h3>
    )
})

type TodoListHeaderProps = {
    title: string
    removeTodoList: () => void
    changeTitle: (title: string) => void
    entityStatus: RequestStatusType
}

