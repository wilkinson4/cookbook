import React, { Component } from 'react';
import { Icon, Button, Column, Card } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import RecipeManager from '../../modules/RecipeManager';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';
import './UserRecipeCard.css';
import AddRatingModal from '../modal/AddRatingModal';



export default class UserRecipeCard extends Component {
    state = {
        showDeleteModal: false,
        showAddRatingModal: false
    }

    deleteRecipe = () => {
        return RecipeManager.deleteRecipe(this.props.recipe.id)
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

    render() {
        return (
            <>
                {/* Confirm Delete Modal */}
                {this.state.showDeleteModal && <ConfirmDeleteModal active={this.state.showDeleteModal} toggleModal={this.toggleDeleteModal} deleteRecipe={this.deleteRecipe} />}
                {/* Add Rating Modal */}
                {this.state.showAddRatingModal && <AddRatingModal active={this.state.showAddRatingModal} toggleModal={this.toggleAddRatingModal} />}
                <Card>
                    <Card.Header className='card-header has-text-left'>
                        <a className='card-title' href={this.props.recipe.recipeLink} target='_blank' rel='noopener noreferrer'>{this.props.recipe.title}</a>
                        <Icon onClick={this.toggleModal}>
                            <FontAwesomeIcon icon={faTimes} size='xs'/>
                        </Icon>
                    </Card.Header>
                    <Card.Content>
                        <Column.Group breakpoint='mobile'>
                            <Column className='has-text-left'>
                                <p>{this.props.recipe.description.slice(0, 150)}...</p>
                            </Column>
                            <Column>
                                <Button>View Details</Button>
                                {
                                   this.props.recipe.imageURL !=="" && <img className='recipeThumbnail__img' src={this.props.recipe.imageURL} alt='Recipe Thumbnail'></img>
                                }
                            </Column>
                        </Column.Group>
                    </Card.Content>
                    <Card.Footer>
                        <Column.Group breakpoint='mobile'>
                            <Column>
                                <Button onClick={this.toggleAddRatingModal}>Add Rating</Button>
                            </Column>
                            <Column>
                                <div className='cookTimeContainer__div'>
                                    <div>
                                        <p>Cook Time</p>
                                    </div>
                                    <div>
                                        {this.props.recipe.cookTime.length > 0
                                            ? <p>{this.props.recipe.cookTime.split('PT')[1]}</p>
                                            : <p>...</p>
                                        }
                                    </div>
                                </div>
                            </Column>
                        </Column.Group>
                    </Card.Footer>
                </Card>
            </>
        )
    }
}