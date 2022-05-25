import {
    appReducer,
    InitialStateType,
    setAppErrorAC,
    setAppStatusAC,
    setIsInitializedAC
} from "./app-reduser";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test('correct error message should be set', () => {
    const endState= appReducer(startState, setAppErrorAC('some error'))

    expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC('failed'))

    expect(endState.status).toBe('failed')
})

test('correct isInitialized should be set', () => {
    const endState = appReducer(startState, setIsInitializedAC(true))

    expect(endState.isInitialized).toBe(true)
})
