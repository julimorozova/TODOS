import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";

type AddItemFormPropsType = {
    label: string
    addItem: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({ addItem, label }) => {
    console.log("AddItemForm")
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
        if(e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {
        if(title.trim() !== "") {
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
                value = { title }
                onChange = { onChangeSetTitle }
                onKeyPress = { onKeyPressAddItem }
                className={error ? "error" : ""}
                size={"small"}
                error={!!error}
                />

            <IconButton
                        onClick = { addTask }>
                <Add />
            </IconButton>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
});

