import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = ({title, changeTitle}) => {
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
            ? <input
                autoFocus={ true }
                value={ newTitle }
                onChange={ onChangeSetUserText }
                onBlur={ offEditMode }
                onKeyPress={ onKeyPressOffMode }
            />
            : <span onDoubleClick={ onEditMode }>{title}</span>
    );
};



