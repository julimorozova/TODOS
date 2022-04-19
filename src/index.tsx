import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {AppWithRedux} from "./AppWithRedux";
import {store} from "./state/store";
import {Provider} from "react-redux";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
root.render(
    <StrictMode>
        <Provider store={store}>
            <AppWithRedux/>
        </Provider>
    </StrictMode>
);
serviceWorker.unregister();

