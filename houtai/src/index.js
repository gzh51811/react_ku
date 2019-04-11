import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from "./pages/Login";
import { Route, Switch } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'; //, Redirect
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import store from "./store";
import { Provider } from 'react-redux';




ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <App />
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);



serviceWorker.unregister();
