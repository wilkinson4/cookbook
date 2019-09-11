import React, { Component } from 'react';
import RecipeList from './RecipeList';
import GoogleRecipeManager from '../../modules/GoogleRecipeManager';
import NavBar from '../nav/Navbar';
import { Button, Input } from 'rbx';
import RecipeModal from '../modal/RecipeModal';


export default class SearchNewRecipes extends Component {
    state = {
        recipeResults: [],
        active: false
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            GoogleRecipeManager.getRecipesFromGoogle(event.target.value)
                .then(recipeResults => {
                    this.setState({ recipeResults: recipeResults.items })
                })
        }
    }
    handleClick = () => {
        const { active } = this.state;
        this.setState({ active: !active });
    }

    toggleModal = () => {
        this.setState({
            active: !this.state.active
        })
    }


    render() {
        return (
            <>
                <NavBar />
                <main className='has-text-centered section' >
                    {/* Displays the modal if this.state.active === true */}
                    {this.state.active && <RecipeModal toggleModal={this.toggleModal} active={this.state.active} {...this.props} />}
                    <h1 className='h1 is-size-3-mobile'>Google for Recipes</h1>
                    <Input type='text' placeholder='search for a recipe' onKeyPress={this.handleKeyPress} />
                    <p>or</p>
                    <Button onClick={this.toggleModal}>Add Your Own</Button>
                    <RecipeList
                        recipeResults={this.state.recipeResults}
                        {...this.props}
                    />
                </main>
            </>
        )
    }
}