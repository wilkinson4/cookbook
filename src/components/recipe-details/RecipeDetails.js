import React, { Component } from 'react';
import NavBar from '../nav/Navbar';
import { Card, Icon, Column } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import StarRatingComponent from 'react-star-rating-component';

export default class RecipeDetails extends Component {
    state = {
        recipe: {}
    }

    findRecipeToViewAndEdit = () => {
        const recipeToDisplayAndEdit = this.props.usersRecipes.find(recipe => recipe.id === parseInt(this.props.match.params.recipeId))
        this.setState({ recipe: recipeToDisplayAndEdit })
    }

    componentDidMount() {
        this.props.getAllRecipes()
            .then(this.findRecipeToViewAndEdit)
    }

    render() {
        return (
            <>
                <NavBar />
                {
                    (this.state.recipe.title !== "" && this.state.recipe.imageURL !== "")
                    && <main className='has-text-centered section'>
                        <Card>
                            <Card.Header>
                                <h3>{this.state.recipe.title}</h3>
                                <Icon>
                                    <FontAwesomeIcon icon={faTimes} size='xs' />
                                </Icon>
                            </Card.Header>
                            <Card.Content>
                                <Column.Group breakpoint='mobile'>
                                    <Column>
                                        <img src={this.state.recipe.imageURL} alt={this.state.recipe.title} />
                                    </Column>
                                    <Column>
                                        <p>{this.state.recipe.description}</p>
                                    </Column>
                                </Column.Group>
                                <Column.Group breakpoint='mobile'>
                                    <Column>
                                        <p>Rating</p>
                                        <StarRatingComponent
                                            name="rate2"
                                            editing={false}
                                            starCount={5}
                                            value={this.state.recipe.rating}
                                        />
                                    </Column>
                                    <Column>
                                        <p>Cook Time</p>
                                        {this.state.recipe.cookTime !== ""
                                            ? <p>{this.state.recipe.cookTime}</p>
                                            : <p>...</p>
                                        }
                                    </Column>
                                </Column.Group>
                            </Card.Content>
                        </Card>
                    </main>
                }
            </>
        )
    }
}