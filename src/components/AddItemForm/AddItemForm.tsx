import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = ({ addItem }) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
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
            <input
                value = { title }
                onChange = { onChangeSetTitle }
                onKeyPress = { onKeyPressAddItem }
                className={error ? "error" : ""}
            />
            <button onClick = { addTask }>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

