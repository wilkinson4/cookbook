import React, { Component } from 'react'
import RecipeCard from './RecipeCard';


export default class RecipeList extends Component {

    render() {
        return (
            <>
                <section className='section recipes__section'>
                    {this.props.recipeResults.map((recipe, i) =>
                        <RecipeCard
                            key={i}
                            recipe={recipe}
                            {...this.props}
                        />
                    )}
                </section>
            </>
        )
    }
}