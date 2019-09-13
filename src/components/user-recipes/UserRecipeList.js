import React, { Component } from 'react';
import NavBar from '../nav/Navbar';
import { Input, Checkbox, Label } from 'rbx';
import UserRecipeCard from './UserRecipeCard';


export default class UserRecipeList extends Component {

    componentDidMount() {
        this.props.getAllRecipes()
            .then(this.props.getAllUsers)
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
                        {this.props.usersRecipes.map(recipe =>
                            <UserRecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                {...this.props}
                                getAllRecipes={this.props.getAllRecipes}
                                toggleModal={this.toggleModal}
                            />
                        )}
                    </section>
                </main>
            </>
        )
    }
}