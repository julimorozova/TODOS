import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {AppWithRedux} from "./AppWithRedux";
import {store} from "./state/store";
import {Provider} from "react-redux";
import ReactDOM from 'react-dom';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
        <AppWithRedux />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
serviceWorker.unregister();

