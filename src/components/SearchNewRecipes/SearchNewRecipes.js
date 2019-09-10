import React, { Component } from 'react';
import RecipeList from './RecipeList';
import GoogleRecipeManager from '../../modules/GoogleRecipeManager';
import NavBar from '../nav/Navbar';
import {Button} from 'rbx';


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


    render() {
        return (
            <>
                <NavBar />
                <main >
                    <h1 className='h1'>Google for Recipes</h1>
                    <input type='text' placeholder='search for a recipe' onKeyPress={this.handleKeyPress} />
                    <p>or</p>
                    <Button>Add Your Own</Button>
                    <RecipeList
                        recipeResults={this.state.recipeResults}
                        {...this.props}
                    />
                </main>
            </>
        )
    }
}