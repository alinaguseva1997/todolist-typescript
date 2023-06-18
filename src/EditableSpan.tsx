import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    oldTitle: string
    callback: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [newTitle, setTitle] = useState(props.oldTitle)
    let [edit, setEdit] = useState<boolean>(false)

    const editHandler = () => {
        setEdit(!edit)
        addTask()
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callback(newTitle)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            editHandler()
        }
    }

    return edit
        ? <TextField id="standard-basic"
                     label="Remove Task"
                     variant="standard"
                     onKeyPress={onKeyPressHandler}
                     value={newTitle}
                     onChange={onChangeTitleHandler}
                     onBlur={editHandler}
                     autoFocus/>
        : <span onDoubleClick={editHandler}>{props.oldTitle}</span>

}