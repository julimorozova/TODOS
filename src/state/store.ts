import {ActionTypeTask, tasksReducer} from './tasks-reducer';
import {ActionTypeTodolist, todolistsReducer} from './todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {ActionsTypeApp, appReducer} from "./app-reduser";
import {ActionTypeAuth, authReducer} from "./auth-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>


export type ActionType = ActionTypeTodolist | ActionTypeTask | ActionsTypeApp | ActionTypeAuth

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    ActionType
    >

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
