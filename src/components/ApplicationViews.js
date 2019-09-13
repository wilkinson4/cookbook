import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import LoginForm from "./auth/Login"
import RegisterForm from "./auth/Register"
import SearchNewRecipes from "./google-recipes/SearchNewRecipes"
import UserRecipeList from './user-recipes/UserRecipeList';
import RecipeDetails from './recipe-details/RecipeDetails';
import RecipeManager from "../modules/RecipeManager";
import UserManager from '../modules/UserManager';

export default class ApplicationViews extends Component {
    state = {
        usersRecipes: [],
        users: [],
    }

    getAllRecipes = () => {
        const activeUserId = parseInt(sessionStorage.getItem('activeUser'))
        return RecipeManager.getRecipesFromSearch('userId', activeUserId)
            .then(recipes => {
                this.setState({ usersRecipes: recipes })
            })
    }

    getAllUsers = () => {
        return UserManager.getAll()
            .then(users => this.setState({ users: users }))
    }

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

                <Route
                    exact path="/recipes" render={props => {
                        return this.isAuthenticated()
                            ? <UserRecipeList
                                getAllRecipes={this.getAllRecipes}
                                usersRecipes={this.state.usersRecipes}
                                getAllUsers={this.getAllUsers}
                                {...props}
                            />
                            : <Redirect to='login' />
                    }}
                />
                <Route
                    path="/recipes/:recipeId(\d+)" render={props => {
                        return this.isAuthenticated()
                            ? <RecipeDetails {...props} />
                            : <Redirect to='login' />
                    }}
                />
            </>
        )
    }
}