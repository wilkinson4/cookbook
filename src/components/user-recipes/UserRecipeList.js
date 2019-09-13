import React, { Component } from 'react';
import RecipeManager from '../../modules/RecipeManager';
import UserManager from '../../modules/UserManager';
import NavBar from '../nav/Navbar';
import { Input, Checkbox, Label } from 'rbx';
import UserRecipeCard from './UserRecipeCard';


export default class UserRecipeList extends Component {
    state = {
        usersRecipes: [],
        users: [],
    }

    getAllRecipes = () => {
        const activeUserId = parseInt(sessionStorage.getItem('activeUser'))
        return RecipeManager.getRecipesFromSearch('userId', activeUserId, {signal: this.abortController.signal})
            .then(recipes => {
                this.setState({ usersRecipes: recipes })
            })
    }

    getAllUsers = () => {
        return UserManager.getAll()
            .then(users => this.setState({ users: users }))
    }

    abortController = new AbortController();

    componentDidMount() {
        this.getAllRecipes()
            .then(this.getAllUsers)
    }

    componentWillUnmount() {
        this.abortController.abort()
    }

    render() {
        return (
            <>
                <NavBar />
                <main className='has-text-centered section' >
                    <section>
                        {/* Displays the modal if this.state.active === true */}
                        <h1 className='h1 is-size-3-mobile'>Your Recipes</h1>
                        <Input type='text' placeholder='hungry for pasta?' />
                        <p>or</p>
                        <Label>
                            <Checkbox />View Made Recipes
                        </Label>
                    </section>
                    <section className='section'>
                        {this.state.usersRecipes.map(recipe =>
                            <UserRecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                {...this.props}
                                getAllRecipes={this.getAllRecipes}
                                toggleModal={this.toggleModal}
                            />
                        )}
                    </section>
                </main>
            </>
        )
    }
}