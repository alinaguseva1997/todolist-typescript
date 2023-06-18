import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    callBack: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title !== "") {
            props.callBack(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const buttonSettings = {
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        minHeight: '40px'
    }

    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}
            <TextField id="outlined-basic"
                       label="New Item"
                       variant="outlined"
                       size={"small"}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
            />

            <Button style={buttonSettings}
                    variant="contained"
                    size="small"
                    color="success"
                    onClick={addTask}>+</Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
