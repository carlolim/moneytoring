import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import { initialize } from './database';
import { createBrowserHistory, createHashHistory } from 'history';
import "./animate.css";
import './App.css';
import 'typeface-roboto';

const configureHistory = () => {
  return window.matchMedia('(display-mode: standalone)').matches
    ? createHashHistory()
    : createBrowserHistory()
}
const history = configureHistory();
initialize(); //initialize database
ReactDOM.render((
    <Router history={history} basename={process.env.PUBLIC_URL}>
        <App />
    </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
