import React, { Component } from 'react';
import ApplicationViews from './ApplicationViews';
import { BrowserRouter as Router } from "react-router-dom";



export default class CookBook extends Component {
  render() {
    return (
      <>
        <Router>
          <ApplicationViews />
        </Router>
      </>
    )
  }
};
