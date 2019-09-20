import React, { Component } from 'react';
import RecipeManager from '../../modules/RecipeManager';
import './RecipeCard.css'
import { Icon, Column, Card } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

export default class RecipeCard extends Component {
    state = {
        isSaved: false,
    }

    saveRecipe = () => {
        const newRecipeObj = {
            title: this.props.recipe.title,
            link: this.props.recipe.link,
            userId: parseInt(sessionStorage.getItem("activeUser")),
            description: this.props.recipe.pagemap.metatags[0]['og:description'] || '',
            imageURL: this.checkImageDataFromGoogle(),
            cookTime: this.checkCookTimeFromGoogle(),
            rating: -1,
            notes: ""
        }
        RecipeManager.saveRecipe(newRecipeObj)
            .then(this.setState({
                isSaved: true
            }))
    }

    checkCookTimeFromGoogle = () => {
        if (this.props.recipe.pagemap.hasOwnProperty('recipe')) {
            return this.props.recipe.pagemap.recipe[0]['totaltime'].split('PT')[1]
        } else if (this.props.recipe.pagemap.metatags[0].hasOwnProperty('ncba:recipetime')) {
            return this.props.recipe.pagemap.metatags[0]['ncba:recipetime'].split('PT')[1]
        } else {
            console.log('returning an empty string')
            return ''
        }
    }

    checkImageDataFromGoogle = () => {
        // check the google api results to see if the image properties below exist and if they do set them to the imageURL in state along with the other information needed in a card
        if (this.props.recipe.pagemap.hasOwnProperty('cse_image')) {
            return this.props.recipe.pagemap.cse_image[0].src
        } else if (this.props.recipe.pagemap.hasOwnProperty('cse_thumbnail')) {
            return this.props.recipe.pagemap.cse_thumbnail[0].src
        } else if (this.props.recipe.pagemap.metatags[0].hasOwnProperty('og:image')) {
            return this.props.recipe.pagemap.metatags[0]['og:image']
        } else {
            return 'https://via.placeholder.com/150?text=Recipe+Image'
        }
    }


    render() {
        const description = this.props.recipe.pagemap.metatags[0]['og:description']
        const imageURL = this.checkImageDataFromGoogle()
        const activeUserId = parseInt(sessionStorage.getItem('activeUser'))
        const activeUsersRecipes = this.props.recipesFromAPI.filter(recipe => recipe.userId === activeUserId)
        // check if the image exists in the Google Results and render an image if it does
        return (
            <Card className='recipeResult__div'>
                <Card.Header>
                    {activeUsersRecipes.find(recipe => recipe.title === this.props.recipe.title) !== undefined || this.state.isSaved
                        ? <Icon>
                            <FontAwesomeIcon icon={faCheck} />
                        </Icon>
                        : <Icon onClick={this.saveRecipe}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Icon>
                    }
                </Card.Header>
                <Card.Content>
                    <Column className='has-text-left'>
                        <a className='cardTitle__a' href={this.props.recipe.link} target='_blank' rel="noopener noreferrer">{this.props.recipe.title}</a>
                    </Column>
                    <Column.Group breakpoint='mobile'>
                        <Column className='has-text-left'>
                            <p className='is-size-7'>{description && description.slice(0, 150)}...</p>
                        </Column>
                        <Column>
                            <img className='recipeThumbnail__img' src={imageURL} alt="Recipe Thumbnail"></img>
                        </Column>
                    </Column.Group>
                </Card.Content>
                <Card.Footer className="card-footer">

                </Card.Footer>
            </Card>
        )
    }
}