import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {TextField} from "@material-ui/core";

export const EditableSpan: React.FC<EditableSpanPropsType> = memo(({title, changeTitle}) => {
    const [newTitle, setNewTitle] = useState<string>(title);
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeSetUserText = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(newTitle)
    }
    const onKeyPressOffMode = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && offEditMode()

    return (
        editMode
            ? <TextField
                id="outlined-basic"
                autoFocus={true}
                value={newTitle}
                onChange={onChangeSetUserText}
                onBlur={offEditMode}
                onKeyPress={onKeyPressOffMode}
                size={"small"}/>
            : <span onDoubleClick={onEditMode}>{title}</span>
    );
});

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}



