import React, { Component } from 'react';
import RecipeManager from '../../modules/RecipeManager';
import './RecipeCard.css'
import { Icon } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

export default class RecipeCard extends Component {
    state = {
        title: "",
        imageURL: "",
        description: "",
        recipeLink: "",
        saveButtonText: "Save",
        isSaved: false,
    }

    saveRecipe = () => {
        const newRecipeObj = {
            title: this.state.title,
            link: this.state.recipeLink,
            userId: parseInt(sessionStorage.getItem("activeUser")),
            description: this.state.description,
            imageURL: this.state.imageURL,
            rating: -1,
            notes: ""
        }
        RecipeManager.saveRecipe(newRecipeObj)
            .then(this.setState({
                saveButtonText: "Saved",
                isSaved: true
            }))
    }

    componentDidMount() {
        // check the google api results to see if the image properties below exist and if they do set them to the imageURL in state along with the other information needed in a card
        if (this.props.recipe.pagemap.hasOwnProperty('cse_image')) {
            this.setState({
                title: this.props.recipe.title,
                imageURL: this.props.recipe.pagemap.cse_image[0].src,
                description: this.props.recipe.pagemap.metatags[0]['og:description'],
                recipeLink: this.props.recipe.link
            })
        } else if (this.props.recipe.pagemap.hasOwnProperty('cse_thumbnail')) {
            this.setState({
                title: this.props.recipe.title,
                imageURL: this.props.recipe.pagemap.cse_thumbnail[0].src,
                description: this.props.recipe.pagemap.metatags[0]['og:description'],
                recipeLink: this.props.recipe.link
            })
        } else {
            this.setState({
                title: this.props.recipe.title,
                imageURL: this.props.recipe.pagemap.metatags[0]['og:image'],
                description: this.props.recipe.pagemap.metatags[0]['og:description'],
                recipeLink: this.props.recipe.link
            })
        }
    }

    render() {
        // check if the image exists in the Google Results and render an image if it does
        if (this.state.imageURL !== "" && this.state.imageURL !== undefined) {
            return (
                <div className='recipeResult__div card'>
                    <div className='card-header'>
                        <a className='card-title' href={this.state.recipeLink} target='_blank' rel="noopener noreferrer">{this.state.title}</a>
                        {!this.state.isSaved
                            ? <Icon onClick={this.saveRecipe}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Icon>
                            : <Icon>
                                <FontAwesomeIcon icon={faCheck} />
                            </Icon>
                        }
                    </div>
                    <div className="-card-content">
                        <p>{this.state.description}</p>
                        <img className='recipeThumbnail__img' src={this.state.imageURL} alt="Recipe Thumbnail"></img>
                    </div>
                    <footer className="card-footer">

                    </footer>
                </div>
            )
            // otherwise render a card without an image
        } else {
            return (
                <div className='recipeResult__div card'>
                    <div className='card-header'>
                        <a className='card-title' href={this.state.recipeLink} target='_blank' rel="noopener noreferrer">{this.state.title}</a>
                        {!this.state.isSaved
                            ? <Icon onClick={this.saveRecipe}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Icon>
                            : <Icon>
                                <FontAwesomeIcon icon={faCheck} />
                            </Icon>
                        }
                    </div>
                    <div className="card-content">
                        <p>{this.state.description}</p>
                    </div>
                    <footer className="card-footer">

                    </footer>
                </div>
            )
        }

    }
}