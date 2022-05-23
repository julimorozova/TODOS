import React from 'react';
import './App.css';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorShackbar";
import {Header} from "./components/Header/Header";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {RequestStatusType} from "./state/app-reduser";
import LinearProgress from "@mui/material/LinearProgress";
import {Todolists} from "./pages/Todolists/Todolists";
import {Routes, Route, Navigate} from "react-router-dom"
import {Login} from "./pages/Login/Login";
export const App = () => {
    const status = useSelector<AppRootStateType, RequestStatusType >(state => state.app.status)
    return (
        <div>
            <Header/>
            { status === 'loading' && <LinearProgress color="secondary"/> }
            <Routes>
                <Route path="/" element={<Todolists/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/notfound" element={<h1 style={{textAlign: 'center'}}>404. Page not found</h1>} />
                <Route path="*" element={<Navigate to="/notfound"/>} />
            </Routes>
            <ErrorSnackbar/>
        </div>
    );
}

