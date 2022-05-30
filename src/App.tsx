import React, {useEffect} from 'react';
import './App.css';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorShackbar";
import {Header} from "./components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {initializeAppTC, RequestStatusType} from "./state/app-reduser";
import LinearProgress from "@mui/material/LinearProgress";
import {Todolists} from "./pages/Todolists/Todolists";
import {Routes, Route, Navigate} from "react-router-dom"
import {Login} from "./pages/Login/Login";
import {CircularProgress} from "@material-ui/core";

export const App = () => {
    // Возможно селекторы лучше хранить отедльно
    const status = useSelector<AppRootStateType, RequestStatusType >(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch()

    useEffect((() => {
        dispatch(initializeAppTC())
    }), [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div>
            <Header/>
            { status === 'loading' && <LinearProgress color="secondary"/> }
            <Routes>
                <Route path="/todos" element={<Todolists/>} />
                <Route path="/todos/login" element={<Login/>} />
                <Route path="/todos/notfound" element={<h1 style={{textAlign: 'center'}}>404. Page not found</h1>} />
                <Route path="*" element={<Navigate to="/todos/notfound"/>} />
            </Routes>
            <ErrorSnackbar/>
        </div>
    );
}

