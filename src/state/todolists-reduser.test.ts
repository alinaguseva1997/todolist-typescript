import {v1} from "uuid";
import {TodolistType} from "../App";
import {addTodolistAC, removeTodolistAC, TodolistsReduser, updateTodoListAC} from "./todolists-reduser";

test('correct todolist should be removed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: "all"},
        {id: todolistID2, title: 'What to buy', filter: "all"}
    ]

    const endState = TodolistsReduser(startState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
})

test('correct todolist should be added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: "all"},
        {id: todolistID2, title: 'What to buy', filter: "all"}
    ]

    const endState = TodolistsReduser(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
})

test('correct todolist should change its name', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: "all"},
        {id: todolistID2, title: 'What to buy', filter: "all"}
    ]

    const endState = TodolistsReduser(startState, updateTodoListAC(todolistID2,newTodolistTitle))

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
})

test('correct filter of todolist should be changed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: "all"},
        {id: todolistID2, title: 'What to buy', filter: "all"}
    ]

    const endState = TodolistsReduser(startState, updateTodoListAC(todolistID2,newTodolistTitle))

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
})