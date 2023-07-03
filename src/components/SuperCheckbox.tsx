import React, {ChangeEvent} from 'react';
import Checkbox from '@mui/material/Checkbox';


type SuperCheckboxPropsType = {
    callBack: (newIsDone: boolean) => void
    isDone: boolean
    color: string
}

export const SuperCheckbox = (props: SuperCheckboxPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }

    return (
        <Checkbox checked={props.isDone} onChange={onChangeHandler} color="success"/>
    );
};