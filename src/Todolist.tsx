import React from "react";

type TodolistPropsType = {
    title: string
    body?: number
    task: Array<TaskType>
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function Todolist(props: TodolistPropsType) {

    const taskMap = props.task.map((el)=>{
        return (
            <li>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
            </li>
        )
    })

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <h3>{props.body}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {taskMap}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
}