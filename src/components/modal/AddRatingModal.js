import React, { Component } from 'react';
import { Modal, Delete, Button, Content } from 'rbx';
import './AddRatingModal.css';
import StarRatingComponent from 'react-star-rating-component';
import RecipeManger from '../../modules/RecipeManager'

export default class AddRatingModal extends Component {
    state = {
        rating: 1
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }

    saveRating = () => {
        const updatedRecipeWithRating = {
            title: this.props.recipe.title,
            link: this.props.recipe.link,
            userId: this.props.recipe.userId,
            description: this.props.recipe.description,
            imageURL: this.props.recipe.imageURL,
            rating: this.state.rating,
            notes: this.props.recipe.notes,
            cookTime: this.props.recipe.cookTime,
            id: this.props.recipe.id
        }

        RecipeManger.updateRecipe(updatedRecipeWithRating)
        .then(this.props.getAllRecipes)
        .then(this.props.toggleAddRatingModal)
    }

    render() {
        const { rating } = this.state;
        return (
            <Modal active={this.props.active}>
                <Modal.Background onClick={this.props.toggleAddRatingModal} />
                <Modal.Card>
                    <Modal.Card.Head>
                        <Modal.Card.Title>Add a rating</Modal.Card.Title>
                        <Delete onClick={this.props.toggleAddRatingModal} />
                    </Modal.Card.Head>
                    <Modal.Card.Body>
                        <Content className='cardContent__div'>
                            <div>
                                <StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={rating}
                                    onStarClick={this.onStarClick.bind(this)}
                                />
                            </div>
                        </Content>
                    </Modal.Card.Body>
                    <Modal.Card.Foot>
                        <Button color="success" onClick={this.saveRating}>Save</Button>
                        <Button onClick={this.props.toggleAddRatingModal}>Cancel</Button>
                    </Modal.Card.Foot>
                </Modal.Card>
            </Modal>
        )
    }
}