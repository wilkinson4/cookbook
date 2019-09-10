import React, { Component } from 'react';
import './RecipeCard.css'

export default class RecipeCard extends Component {
    state = {
        title: "",
        imageURL: "",
        description: "",
        recipeLink: ""
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
                <div className='recipeResult__div'>
                    <div className='row'>
                        <a href={this.state.recipeLink} target='_blank' rel="noopener noreferrer">{this.state.title}</a>
                        <button>Save</button>
                    </div>
                    <div className="row">
                        <p>{this.state.description}</p>
                        <img className='recipeThumbnail__img' src={this.state.imageURL} alt="Recipe Thumbnail"></img>
                    </div>
                    <div className="row">

                    </div>
                </div>
            )
            // otherwise render a card without an image
        } else {
            return (
                <div className='recipeResult__div'>
                    <div className='row'>
                        <a href={this.state.recipeLink} target='_blank' rel="noopener noreferrer">{this.state.title}</a>
                        <button>Save</button>
                    </div>
                    <div className="row">
                        <p>{this.state.description}</p>
                    </div>
                    <div className="row">

                    </div>
                </div>
            )
        }

    }
}