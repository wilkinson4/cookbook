import React, { Component } from 'react';
import { Icon, Button, Column } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import RecipeManager from '../../modules/RecipeManager';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';
import './UserRecipeCard.css';



export default class UserRecipeCard extends Component {
    state = {
        active: false
    }

    deleteRecipe = () => {
        return RecipeManager.deleteRecipe(this.props.recipe.id)
            .then(this.props.getAllRecipes)
    }

    toggleModal = () => {
        this.setState(() => {
            return { active: !this.state.active }
        })
    }

    render() {
        return (
            <div className='recipeResult__div card'>
                {/* Confirm Delete Modal */}
                {this.state.active && <ConfirmDeleteModal active={this.state.active} toggleModal={this.toggleModal} deleteRecipe={this.deleteRecipe} />}
                <div className='iconContainer__div'>

                </div>
                <div className='card-header has-text-left'>
                    <a className='card-title' href={this.props.recipe.recipeLink} target='_blank' rel='noopener noreferrer'>{this.props.recipe.title}</a>
                    <Icon onClick={this.toggleModal}>
                        <FontAwesomeIcon icon={faTimes} />
                    </Icon>
                </div>
                <div className='card-content'>
                    <Column.Group breakpoint='mobile'>
                        <Column className='has-text-left'>
                            <p>{this.props.recipe.description.slice(0, 150)}...</p>
                        </Column>
                        <Column>
                            <Button>View Details</Button>
                            <img className='recipeThumbnail__img' src={this.props.recipe.imageURL} alt='Recipe Thumbnail'></img>
                        </Column>
                    </Column.Group>
                </div>
                <footer>
                    <Column.Group breakpoint='mobile' className='card-footer'>
                        <Column>
                            <Button>Add Rating</Button>
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
                </footer>
            </div>
        )
    }
}