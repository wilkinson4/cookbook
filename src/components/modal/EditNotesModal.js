import React, { Component } from 'react';
import RecipeManager from '../../modules/RecipeManager';
import { Modal, Delete, Content, Textarea, Button, Field, Message } from 'rbx';

export default class EditNotesModal extends Component {
    state = {
        notes: "",
        displayError: "none",
        errorMessage: ""
    }

    saveRecipeWithUpdatedNotes = () => {
        const updatedRecipe = {
            title: this.props.currentRecipe.title,
            link: this.props.currentRecipe.link,
            userId: this.props.currentRecipe.userId,
            description: this.props.currentRecipe.description,
            imageURL: this.props.currentRecipe.imageURL,
            rating: this.props.currentRecipe.rating,
            notes: this.state.notes,
            cookTime: this.props.currentRecipe.cookTime,
            id: this.props.currentRecipe.id
        }
        RecipeManager.updateRecipe(updatedRecipe)
        .then(updatedRecipe => this.props.setCurrentRecipe(updatedRecipe))
        .then(this.props.toggleEditNotesModal)
    }

    handleFieldChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    render() {
        const displayErrorMessage = {
            display: this.state.displayError
        }
        return (
            <Modal active={this.props.active}>
                <Modal.Background onClick={this.props.toggleEditNotesModal} />
                <Modal.Card>
                    <Modal.Card.Head>
                        <Modal.Card.Title>Edit Notes</Modal.Card.Title>
                        <Delete onClick={this.props.toggleEditNotesModal} />
                    </Modal.Card.Head>
                    <Modal.Card.Body>
                        <Content>
                            <Message color="danger" style={displayErrorMessage}>
                                <Message.Header>
                                    <p>Error</p>
                                </Message.Header>
                                <Message.Body>
                                    <p>{this.state.errorMessage}</p>
                                </Message.Body>
                            </Message>
                            <Field>
                                <Textarea rows={10} id="notes" onChange={this.handleFieldChange} placeholder="Recipe Description" defaultValue={this.props.recipeNotes}/>
                            </Field>
                        </Content>
                    </Modal.Card.Body>
                    <Modal.Card.Foot>
                        <Button color="success" onClick={this.saveRecipeWithUpdatedNotes}>Save Notes</Button>
                        <Button onClick={this.props.toggleEditNotesModal}>Cancel</Button>
                    </Modal.Card.Foot>
                </Modal.Card>
            </Modal>
        )
    }
}