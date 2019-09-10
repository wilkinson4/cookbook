import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CookBook from './components/CookBook';
import * as serviceWorker from './serviceWorker';
import "rbx/index.css";
require('dotenv').config()

ReactDOM.render(<CookBook />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
