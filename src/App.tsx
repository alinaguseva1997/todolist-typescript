import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {ButtonAppBar} from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeFilterTodoListAC,
    removeTodolistAC,
    TodolistsReduser,
    updateTodoListAC
} from "./state/todolists-reduser";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })

    const removeTodolist = (todolistID: string) => {
        TodolistsReduser(todolists, removeTodolistAC(todolistID))
    }

    function removeTask(todolistID: string, taskId: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId)});
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    }

    function changeStatus(todolistID: string, taskId: string, newIsDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)});
    }

    function changeFilter(todolistId: string, valueFilter: FilterValuesType) {
            TodolistsReduser(todolists, changeFilterTodoListAC(todolistId,valueFilter))
    }

    const addTodolist = (newTodolistTitle: string) => {
        TodolistsReduser(todolists,addTodolistAC(newTodolistTitle))
    }

    const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, title: newTitle} : t)})
    }

    const updateTodoList = (todolistID: string, newTodolistTitle: string) => {
        TodolistsReduser(todolists,updateTodoListAC(todolistID,newTodolistTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid style={{padding: '20px'}} container>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(t => {

                        let tasksForTodolist = tasks[t.id];

                        if (t.filter === "active") {
                            tasksForTodolist = tasks[t.id].filter(t => t.isDone === false);
                        }
                        if (t.filter === "completed") {
                            tasksForTodolist = tasks[t.id].filter(t => t.isDone === true);
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: '20px'}} elevation={5}>
                                    <Todolist key={t.id}
                                              todolistId={t.id}
                                              title={t.title}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeStatus}
                                              filter={t.filter}
                                              removeTodolist={removeTodolist}
                                              updateTask={updateTask}
                                              updateTodoList={updateTodoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
