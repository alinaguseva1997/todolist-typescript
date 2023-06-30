import {TodolistType} from "../App";
import {v1} from "uuid";

type ActionsType = removeTodolistACType | addTodolistACType | updateTodoListACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>
type updateTodoListACType = ReturnType<typeof updateTodoListAC>

export const TodolistsReduser = (state:TodolistType[], action: ActionsType):TodolistType[]  => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistID)
        }
        case 'ADD-TODOLIST': {
            let todolistID3 = v1();
            let newTodoList: TodolistType = {id: todolistID3, title: action.payload.newTodolistTitle, filter: 'all'}
            return [newTodoList, ...state]
        }
        case 'UPDATE-TODOLIST': {
            return state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.newTodolistTitle} : el)
        }
        default: {
            return state
        }
    }
}

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
}

export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistTitle
        }
    } as const
}

export const updateTodoListAC = (todolistID: string,newTodolistTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST',
        payload: {
            todolistID, newTodolistTitle
        }
    } as const
}


