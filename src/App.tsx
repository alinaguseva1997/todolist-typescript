import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const title1 = 'What to learn111111'

    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]
    const tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false },
        { id: 4, title: "Yo2", isDone: false }
    ]

    return (
        <div>
            <Todolist title = {title1} body = {100200} task = {tasks1}/>
            <Todolist title = {'What to learn222222'} task = {tasks2}/>
        </div>
    );
}

export default App;
