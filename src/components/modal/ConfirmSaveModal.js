import React, { Component } from 'react';
import { Modal, Delete, Button } from 'rbx';
import RecipeManager from '../../modules/RecipeManager';

export default class ConfirmSaveModal extends Component {

    saveRecipeWithUpdatedNotes = () => {
        const updatedRecipe = {
            title: this.props.currentRecipe.title,
            link: this.props.currentRecipe.link,
            userId: this.props.currentRecipe.userId,
            description: this.props.currentRecipe.description,
            imageURL: this.props.currentRecipe.imageURL,
            rating: this.props.currentRecipe.rating,
            notes: this.props.notes,
            cookTime: this.props.currentRecipe.cookTime,
            id: this.props.currentRecipe.id
        }
        RecipeManager.updateRecipe(updatedRecipe)
        .then(updatedRecipe => this.props.setCurrentRecipe(updatedRecipe))
        .then(this.props.toggleSaveRecipeNotesModal)
        .then(this.props.findRecipeToReviewAndEdit)
    }

    render() {
        return (
            <Modal active={this.props.active}>
                <Modal.Background onClick={this.props.toggleSaveRecipeNotesModal} />
                <Modal.Card>
                    <Modal.Card.Head>
                        <Modal.Card.Title>Save Changes?</Modal.Card.Title>
                        <Delete onClick={this.props.toggleSaveRecipeNotesModal} />
                    </Modal.Card.Head>
                    <Modal.Card.Foot>
                        <Button color="success" onClick={this.saveRecipeWithUpdatedNotes}>Yes</Button>
                        <Button onClick={this.props.toggleSaveRecipeNotesModal}>No</Button>
                    </Modal.Card.Foot>
                </Modal.Card>
            </Modal>
        )
    }
}