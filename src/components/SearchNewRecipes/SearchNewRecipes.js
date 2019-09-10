import React, { Component } from 'react';
import MobileNav from '../nav/MobileNav';
import DesktopNav from '../nav/DesktopNav';
import MediaQuery from 'react-responsive';
import RecipeList from './RecipeList';
import GoogleRecipeManager from '../../modules/GoogleRecipeManager'

export default class SearchNewRecipes extends Component {
    state = {
        recipeResults: []
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            GoogleRecipeManager.getRecipesFromGoogle(event.target.value)
                .then(recipeResults => {
                    this.setState({ recipeResults: recipeResults.items })
                })
        }
    }

    render() {
        return (
            <MediaQuery minDeviceWidth={1024} device={{ deviceWidth: 1600 }}>
                <MediaQuery maxDeviceWidth={1024}>
                    <div id='outer-container'>
                        <MobileNav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} {...this.props} />
                        <main id='page-wrap'>
                            <h1 className='h1'>Google for Recipes</h1>
                            <input type='text' placeholder='search for a recipe' onKeyPress={this.handleKeyPress} />
                            <p>or</p>
                            <button>Add Your Own</button>
                            <RecipeList
                                recipeResults={this.state.recipeResults}
                                {...this.props}
                            />
                        </main>
                    </div>
                </MediaQuery>
                <MediaQuery minDeviceWidth={1024}>
                    <DesktopNav />
                    <main id='searchRecipes__main'>
                        <h1 className='h1'>Google for Recipes</h1>
                        <input type='text' placeholder='search for a recipe' onKeyPress={this.handleKeyPress} />
                        <p>or</p>
                        <button>Add Your Own</button>
                        <RecipeList
                            recipeResults={this.state.recipeResults}
                            {...this.props}
                        />
                    </main>
                </MediaQuery>

            </MediaQuery>
        )
    }
}