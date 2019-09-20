import React, { Component } from 'react';
import { Icon, Button, Column, Card } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import RecipeManager from '../../modules/RecipeManager';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';
import AddRatingModal from '../modal/AddRatingModal';
import StarRatingComponent from 'react-star-rating-component';
import './UserRecipeCard.css';



export default class UserRecipeCard extends Component {
    state = {
        showDeleteModal: false,
        showAddRatingModal: false
    }

    deleteRecipe = () => {
        return RecipeManager.deleteRecipe(this.props.recipe.id)
            .then(this.toggleDeleteModal)
            .then(this.props.getAllRecipes)
    }

    toggleDeleteModal = () => {
        this.setState(() => {
            return { showDeleteModal: !this.state.showDeleteModal }
        })
    }

    toggleAddRatingModal = () => {
        this.setState(() => {
            return { showAddRatingModal: !this.state.showAddRatingModal }
        })
    }

    viewRecipeDetails = () => {
        this.props.setCurrentRecipe(this.props.recipe)
        this.props.history.push(`/recipes/${this.props.recipe.id}`)
    }

    render() {
        const primaryButton = "danger"
        return (
            <>
                {/* Confirm Delete Modal */}
                {this.state.showDeleteModal && <ConfirmDeleteModal active={this.state.showDeleteModal} toggleDeleteModal={this.toggleDeleteModal} deleteRecipe={this.deleteRecipe} />}
                {/* Add Rating Modal */}
                {this.state.showAddRatingModal && <AddRatingModal active={this.state.showAddRatingModal} toggleAddRatingModal={this.toggleAddRatingModal} recipe={this.props.recipe} {...this.props} />}
                <Card>
                    <Card.Header className='card-header has-text-centered'>
                        <Card.Header.Icon as='span'>
                            <Icon onClick={this.toggleDeleteModal}>
                                <FontAwesomeIcon icon={faTimes} size='xs' />
                            </Icon>
                        </Card.Header.Icon>
                    </Card.Header>
                    <Card.Content>
                        <Column.Group>
                            <Column>
                                <a className='cardTitle__a' href={this.props.recipe.link} target='_blank' rel='noopener noreferrer'>
                                    <h3>{this.props.recipe.title}</h3>
                                </a>
                            </Column>
                        </Column.Group>
                        <Column.Group breakpoint='mobile'>
                            <Column className='has-text-left'>
                                <p className='is-size-7'>{this.props.recipe.description.slice(0, 150)}...</p>
                            </Column>
                            <Column className='detailsImageColumn__div'>
                                {
                                    this.props.recipe.imageURL !== "" && <img className='recipeThumbnail__img' src={this.props.recipe.imageURL} alt='Recipe Thumbnail'></img>
                                }
                            </Column>
                        </Column.Group>
                    </Card.Content>
                    <Card.Footer>
                        <Card.Footer.Item>
                            {
                                this.props.recipe.rating === -1
                                    ? <Button onClick={this.toggleAddRatingModal} size='small' >Add Rating</Button>
                                    : <div className='userStarRating__div' onClick={this.toggleAddRatingModal}>
                                        <p>Rating</p>
                                        <StarRatingComponent
                                            name="rate2"
                                            editing={false}
                                            starCount={5}
                                            value={this.props.recipe.rating}
                                        />
                                    </div>
                            }
                        </Card.Footer.Item>
                        <Card.Footer.Item>
                            <div className='cookTimeContainer__div'>
                                <div>
                                    <p>Cook Time</p>
                                </div>
                                <div>
                                    {this.props.recipe.cookTime !== ""
                                        ? <p>{this.props.recipe.cookTime}</p>
                                        : <p>...</p>
                                    }
                                </div>
                            </div>
                        </Card.Footer.Item>
                        <Card.Footer.Item>
                            <Button onClick={this.viewRecipeDetails} color={primaryButton} size='small'>View Details</Button>
                        </Card.Footer.Item>
                    </Card.Footer>
                </Card>
            </>
        )
    }
}