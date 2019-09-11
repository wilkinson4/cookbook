import React, { Component } from 'react'
import RecipeCard from './RecipeCard';

export default class RecipeResults extends Component {
    render() {
        return (
            <>
                {this.props.recipeResults.map(recipe => 
                    <RecipeCard
                    key={recipe.cacheId}
                    recipe={recipe}
                    {...this.props}
                    />
                )}
            </>
        )
    }
}