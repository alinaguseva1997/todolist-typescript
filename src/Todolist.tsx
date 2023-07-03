import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import {Delete} from "@mui/icons-material";
import Button from '@mui/material/Button';
import {SuperCheckbox} from "./components/SuperCheckbox";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
    updateTodoList: (todolistID: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId,"completed");
    const removeTodoListHandler = () => props.removeTodolist(props.todolistId)

    const onChangeHandler = (id: string, newIsDone: boolean) => {
        props.changeTaskStatus(props.todolistId, id, newIsDone);
    }

    const addTaskCallBack = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const updateTaskHandler = (newTaskTitle: string, taskID: string) => {
        props.updateTask(props.todolistId, taskID, newTaskTitle)
    }
    const updateTodoListHandler = (newTodolistTitle: string) => {
        props.updateTodoList(props.todolistId, newTodolistTitle)
    }


    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callback={updateTodoListHandler}/>
            <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm callBack = {addTaskCallBack}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId,t.id)

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<Checkbox color="success"onChange={onChangeHandler} checked={t.isDone}/>*/}
                        <SuperCheckbox callBack = {(newIsDone)=>onChangeHandler(t.id, newIsDone)} isDone = {t.isDone} color="success"/>
                        <EditableSpan oldTitle = {t.title} callback={(newTitle)=>updateTaskHandler(newTitle,t.id)}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "outlined"} color="success" onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "contained" : "outlined"} color="success" onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "contained" : "outlined"} color="success" onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}

