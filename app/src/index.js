import React from 'react';
import { render } from 'react-dom';
import './index.css';

import { HashRouter, BrowserRouter, Route } from 'react-router-dom';
import App from './App';

import * as serviceWorker from './serviceWorker';
render(
    <HashRouter>
        <App />
        {/* <Route component={App}></Route> */}
    </HashRouter>
    ,
    document.querySelector('#root')
)
serviceWorker.unregister();