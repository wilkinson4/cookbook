import React, { Component } from 'react';
import { Icon } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import RecipeManager from '../../modules/RecipeManager';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';



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
                <div className='card-header has-text-left'>
                    <a className='card-title' href={this.props.recipe.recipeLink} target='_blank' rel="noopener noreferrer">{this.props.recipe.title}</a>
                    <Icon className='is-pulled-right' onClick={this.toggleModal}>
                        <FontAwesomeIcon icon={faTimes} />
                    </Icon>
                </div>
                <div className="-card-content">
                    <p>{this.props.recipe.description}</p>
                    <img className='recipeThumbnail__img' src={this.props.recipe.imageURL} alt="Recipe Thumbnail"></img>
                </div>
                <footer className="card-footer">

                </footer>
            </div>
        )
    }
}