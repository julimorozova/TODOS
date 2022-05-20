import React from 'react';
import './App.css';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorShackbar";
import {Header} from "./components/Header/Header";
import {Todolists} from "./components/Todolists/Todolists";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {RequestStatusType} from "./state/app-reduser";
import LinearProgress from "@mui/material/LinearProgress";

export const App = () => {
    const status = useSelector<AppRootStateType, RequestStatusType >(state => state.app.status)
    return (
        <div>
            <Header/>
            { status === 'loading' && <LinearProgress color="secondary"/> }
            <Todolists/>
            <ErrorSnackbar/>
        </div>
    );
}

