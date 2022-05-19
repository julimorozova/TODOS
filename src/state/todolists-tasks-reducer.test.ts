import {TaskStateType} from "../AppWithRedux";
import {tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, RemoveTodoListAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = AddTodoListAC({
        id: "todolistId3",
            title: "new todolist",
            addedDate: "",
            order: 1
    });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});

test('property with todolistId should be deleted', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New,
                description: "", completed: "", priority: TaskPriorities.Low, startDate: "",
                deadline: "", todoListId: "todolistId1", order: 0, addedDate: "" },
            { id: "2", title: "JS", status: TaskStatuses.Completed,
                description: "", completed: "", priority: TaskPriorities.Low, startDate: "",
                deadline: "", todoListId: "todolistId1", order: 0, addedDate: "" },
            { id: "3", title: "React", status: TaskStatuses.New,
                description: "", completed: "", priority: TaskPriorities.Low, startDate: "",
                deadline: "", todoListId: "todolistId1", order: 0, addedDate: "" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New,
                description: "", completed: "", priority: TaskPriorities.Low, startDate: "",
                deadline: "", todoListId: "todolistId2", order: 0, addedDate: "" },
            { id: "2", title: "milk", status: TaskStatuses.Completed,
                description: "", completed: "", priority: TaskPriorities.Low, startDate: "",
                deadline: "", todoListId: "todolistId2", order: 0, addedDate: "" },
            { id: "3", title: "tea", status: TaskStatuses.New,
                description: "", completed: "", priority: TaskPriorities.Low, startDate: "",
                deadline: "", todoListId: "todolistId2", order: 0, addedDate: "" }
        ]
    };

    const action = RemoveTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

