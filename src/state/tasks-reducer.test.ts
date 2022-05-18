import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    SetTasksAC,
    tasksReducer
} from './tasks-reducer';
import {TaskStateType} from '../AppWithRedux';
import {AddTodoListAC, SetTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TaskStateType;

beforeEach(() => {
    startState = {
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
            { id: "3", title: "tea", status: TaskStatuses.Completed,
                description: "", completed: "", priority: TaskPriorities.Low, startDate: "",
                deadline: "", todoListId: "todolistId2", order: 0, addedDate: "" }
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
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
            { id: "3", title: "tea", status: TaskStatuses.Completed,
                description: "", completed: "", priority: TaskPriorities.Low, startDate: "",
                deadline: "", todoListId: "todolistId2", order: 0, addedDate: "" }
        ]
    });

});

test('correct task should be added to correct array', () => {
    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC("2", "cottage cheese", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("cottage cheese");
    expect(endState["todolistId2"][0].title).toBe("bread");
});

test('new array should be added when new todolist is added', () => {
    const action = AddTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('empty arrays should be added when we set todolists', () => {
    const action = SetTodolistsAC([
        {
            id: "1",
            title: "What to learn",
            addedDate: "",
            order: 0
        },
        {
            id: "2",
            title: "What to buy",
            addedDate: "",
            order: 0
        }
    ])

    const endState = tasksReducer({}, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["1"]).toStrictEqual([]);
    expect(endState["2"]).toStrictEqual([]);
});

test('tasks should be added foe todolist', () => {
    const action = SetTasksAC(startState["todolistId1"], "todolistId1");

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)



    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
});

