import React, { Component } from 'react'
import RecipeManager from '../../modules/RecipeManager';
import UserManager from '../../modules/UserManager';
import NavBar from '../nav/Navbar'


export default class RecipeList extends Component {
    state = {
        usersRecipes: [],
        users: []
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
    componentDidMount() {
        this.getAllRecipes()
            .then(this.getAllUsers)
    }
    render() {
        return (
            <>
                <NavBar />
                <h1>Your Recipes</h1>
            </>
        )
    }
}