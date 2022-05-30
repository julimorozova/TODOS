import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";

export const AddItemForm: React.FC<AddItemFormPropsType> = memo(({addItem, label, disabled}) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(null);
        setTitle(e.currentTarget.value);
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        if (title.trim() !== "") {
            addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required")
        }
    }
    return (
        <div>
            <TextField
                id="standard-basic"
                label={label}
                disabled={disabled}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressAddItem}
                // Можно пакет classname использовать что бы писать такие условия удобнее
                className={error ? "error" : ""}
                size={"small"}
                error={!!error}/>
            <IconButton onClick={addTask} disabled={disabled}>
                <Add/>
            </IconButton>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
});

type AddItemFormPropsType = {
    label: string
    disabled?: boolean
    addItem: (title: string) => void
}

