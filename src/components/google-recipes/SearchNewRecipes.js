import React, { Component } from 'react';
import RecipeList from './RecipeList';
import GoogleRecipeManager from '../../modules/GoogleRecipeManager';
import RecipeManager from '../../modules/RecipeManager'
import NavBar from '../nav/Navbar';
import { Button, Input } from 'rbx';
import RecipeModal from '../modal/RecipeModal';


export default class SearchNewRecipes extends Component {
    state = {
        recipeResultsFromGoogle: [],
        recipesFromAPI: [],
        active: false
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            GoogleRecipeManager.getRecipesFromGoogle(event.target.value)
                .then(recipeResultsFromGoogle => {
                    this.setState({ recipeResultsFromGoogle: recipeResultsFromGoogle.items })
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
    getRecipesFromAPI = () => {
        RecipeManager.getAll()
        .then(recipesInAPI => {
            this.setState({recipesFromAPI: recipesInAPI})
        })
    }
    componentDidMount() {
        this.getRecipesFromAPI()
    }

    render() {
        return (
            <>
                <NavBar />
                <main className='has-text-centered section' >
                    {/* Displays the modal if this.state.active === true */}
                    {this.state.active && <RecipeModal toggleModal={this.toggleModal} active={this.state.active} getAllRecipes={this.props.getAllRecipes} {...this.props} />}
                    <h1 className='h1 is-size-3-mobile'>Google for Recipes</h1>
                    <Input type='text' placeholder='search for a recipe' onKeyPress={this.handleKeyPress} />
                    <p>or</p>
                    <Button onClick={this.toggleModal}>Add Your Own</Button>
                    <RecipeList
                        recipeResults={this.state.recipeResultsFromGoogle}
                        recipesFromAPI={this.state.recipesFromAPI}
                        {...this.props}
                    />
                </main>
            </>
        )
    }
}