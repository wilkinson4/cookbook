import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import LoginForm from "./auth/Login"
import RegisterForm from "./auth/Register"
import SearchNewRecipes from "./SearchNewRecipes/SearchNewRecipes"

export default class ApplicationViews extends Component {

    isAuthenticated = () => sessionStorage.getItem("activeUser") !== null

    render() {
        return (
            <>
                <Route
                    exact path="/" render={props => {
                        return this.isAuthenticated()
                            ? <SearchNewRecipes {...props} />
                            : <Redirect to='login' />
                    }}
                />
                {/* Render login form */}
                <Route path="/login" component={LoginForm} />
                {/* Render register form */}
                <Route path="/register" component={RegisterForm} />
            </>
        )
    }
}