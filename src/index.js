import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, BrowserRouter } from 'react-router-dom';
import { initialize } from './database';
import { createBrowserHistory, createHashHistory } from 'history';
import './App.css';
import 'typeface-roboto';

initialize(); //initialize database
const isPwa = window.matchMedia('(display-mode: standalone)').matches;

// const configureHistory = () => {
//   return isPwa ? createHashHistory() : createBrowserHistory();
// }

// const history = configureHistory();
// console.log(isPwa, process.env.PUBLIC_URL);
if (!isPwa) {
    ReactDOM.render((
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <App />
        </BrowserRouter>
    ), document.getElementById('root'));   
}
else {
    ReactDOM.render((
        <Router history={createHashHistory()} basename={process.env.PUBLIC_URL}>
            <App />
        </Router>
    ), document.getElementById('root'));    
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
