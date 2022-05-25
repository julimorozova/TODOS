import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {App} from "./App";
import {store} from "./state/store";
import {Provider} from "react-redux";
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
serviceWorker.unregister();

