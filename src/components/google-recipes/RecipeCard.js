import React, { Component } from 'react';
import RecipeManager from '../../modules/RecipeManager';
import './RecipeCard.css'
import { Icon, Column } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

export default class RecipeCard extends Component {
    state = {
        title: "",
        imageURL: "",
        description: "",
        recipeLink: "",
        cookTime: "",
        isSaved: false,
    }

    saveRecipe = () => {
        const newRecipeObj = {
            title: this.state.title,
            link: this.state.recipeLink,
            userId: parseInt(sessionStorage.getItem("activeUser")),
            description: this.state.description,
            imageURL: this.state.imageURL,
            cookTime: this.state.cookTime,
            rating: -1,
            notes: ""
        }
        RecipeManager.saveRecipe(newRecipeObj)
            .then(this.setState({
                isSaved: true
            }))
    }

    checkCookTimeFromGoogle = (imageURL) => {
        if (this.props.recipe.pagemap.hasOwnProperty('recipe')) {
            this.setState({
                title: this.props.recipe.title,
                imageURL: imageURL,
                description: this.props.recipe.pagemap.metatags[0]['og:description'] || '',
                cookTime: this.props.recipe.pagemap.recipe[0]['totaltime'],
                recipeLink: this.props.recipe.link,
            })
        } else if (this.props.recipe.pagemap.metatags[0].hasOwnProperty('ncba:recipetime')) {
            this.setState({
                title: this.props.recipe.title,
                imageURL: imageURL,
                description: this.props.recipe.pagemap.metatags[0]['og:description'] || '',
                cookTime: this.props.recipe.pagemap.metatags[0]['ncba:recipetime'],
                recipeLink: this.props.recipe.link,
            })
        } else {
            this.setState({
                title: this.props.recipe.title,
                imageURL: imageURL,
                description: this.props.recipe.pagemap.metatags[0]['og:description'] || '',
                cookTime: "",
                recipeLink: this.props.recipe.link,
            })
        }
    }

    checkImageDataFromGoogle = () => {
        // check the google api results to see if the image properties below exist and if they do set them to the imageURL in state along with the other information needed in a card
        if (this.props.recipe.pagemap.hasOwnProperty('cse_image')) {
            this.checkCookTimeFromGoogle(this.props.recipe.pagemap.cse_image[0].src)
        } else if (this.props.recipe.pagemap.hasOwnProperty('cse_thumbnail')) {
            this.checkCookTimeFromGoogle(this.props.recipe.pagemap.cse_thumbnail[0].src)
        } else {
            this.checkCookTimeFromGoogle(this.props.recipe.pagemap.metatags[0]['og:image'])
        }
    }


    componentDidMount() {
        this.checkImageDataFromGoogle()
    }

    render() {
        const activeUserId = parseInt(sessionStorage.getItem('activeUser'))
        const activeUsersRecipes = this.props.recipesFromAPI.filter(recipe => recipe.userId === activeUserId)
        // check if the image exists in the Google Results and render an image if it does
        if (this.state.imageURL !== "" && this.state.imageURL !== undefined) {
            return (
                <div className='recipeResult__div card'>
                    <div className='card-header'>
                        <a className='cardTitle__a' href={this.state.recipeLink} target='_blank' rel="noopener noreferrer">{this.state.title}</a>
                        {activeUsersRecipes.find(recipe => recipe.title === this.state.title) !== undefined || this.state.isSaved
                            ? <Icon>
                                <FontAwesomeIcon icon={faCheck} />
                            </Icon>
                            : <Icon onClick={this.saveRecipe}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Icon>
                        }
                    </div>
                    <div className="card-content">
                        <Column.Group breakpoint='mobile'>
                            <Column className='has-text-left'>
                                <p className='is-size-7'>{this.state.description && this.state.description.slice(0, 150)}...</p>
                            </Column>
                            <Column>
                                <img className='recipeThumbnail__img' src={this.state.imageURL} alt="Recipe Thumbnail"></img>
                            </Column>
                        </Column.Group>
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
                        <a className='cardTitle__a' href={this.state.recipeLink} target='_blank' rel="noopener noreferrer">{this.state.title}</a>
                        {activeUsersRecipes.find(recipe => recipe.title === this.state.title) !== undefined || this.state.isSaved
                            ? <Icon>
                                <FontAwesomeIcon icon={faCheck} />
                            </Icon>
                            : <Icon onClick={this.saveRecipe}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Icon>
                        }
                    </div>
                    <div className="has-text-left card-content">
                        <p className='is-size-7'>{this.state.descripttion && this.state.description.slice(0, 150)}...</p>
                    </div>
                    <footer className="card-footer">

                    </footer>
                </div>
            )
        }

    }
}