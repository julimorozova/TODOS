import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
    FilterValueType,
    removeTodoListAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2= v1();

    startState = [
        {
            id: todolistId1,
            title: "What to learn",
            addedDate: "",
            order: 1,
            filter: "all"
        },
        {
            id: todolistId2,
            title: "new todolist",
            addedDate: "",
            order: 1,
            filter: "all"
        }
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, addTodoListAC({
        id: "todolistId3",
        title: "New Todolist",
        addedDate: "",
        order: 1
    }))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValueType = "completed";

    const endState = todolistsReducer(startState, changeTodoListFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists shold be set to the state', () => {
    const endState = todolistsReducer([], setTodolistsAC(startState));

    expect(endState.length).toBe(2);
});

