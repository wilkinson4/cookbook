import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CookBook from './components/CookBook';
import * as serviceWorker from './serviceWorker';
import "rbx/index.css";
import './index.css';
import {ThemeContext} from 'rbx/base/theme'
import { makeRootValidatingTransform } from "rbx/base/helpers";
import { DEFAULTS } from "rbx/base/helpers/variables";
import './index.sass'
require('dotenv').config()

const COLORS = [...DEFAULTS.colors, "danger"];

const themeValue = {
    transform: makeRootValidatingTransform({ colors: COLORS })
};

ReactDOM.render(<ThemeContext.Provider value={themeValue}><CookBook /></ThemeContext.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
