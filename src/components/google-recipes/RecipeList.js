import React, { Component } from 'react'
import RecipeCard from './RecipeCard';

export default class RecipeList extends Component {
    render() {
        return (
            <>
                <section className='section'>
                    {this.props.recipeResults.map(recipe =>
                        <RecipeCard
                            key={recipe.cacheId}
                            recipe={recipe}
                            {...this.props}
                        />
                    )}
                </section>
            </>
        )
    }
}