import React, { Component } from 'react';
import RecipeManager from '../../modules/RecipeManager';
import { Modal, Delete, Content, Input, Field, Message, Button } from 'rbx';

export default class AddCookTimeModal extends Component {
    state = {
        hours: "",
        minutes: "",
        displayError: "none",
        errorMessage: ""
    }

    handleFieldChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    saveCookTime = () => {
        const updatedRecipe = {
            title: this.props.currentRecipe.title,
            link: this.props.currentRecipe.link,
            userId: this.props.currentRecipe.userId,
            description: this.props.currentRecipe.description,
            imageURL: this.props.currentRecipe.imageURL,
            rating: this.props.currentRecipe.rating,
            notes: this.props.currentRecipe.notes,
            cookTime: `${this.state.hours}H${this.state.minutes}M`,
            id: this.props.currentRecipe.id
        }
        return RecipeManager.updateRecipe(updatedRecipe)
            .then(updatedRecipe => this.props.setCurrentRecipe(updatedRecipe))
            .then(this.props.toggleCookTimeModal)
    }

    render() {
        const displayErrorMessage = {
            display: this.state.displayError
        }
        return (
            <Modal active={this.props.active}>
                <Modal.Background onClick={this.props.toggleCookTimeModal} />
                <Modal.Card>
                    <Modal.Card.Head>
                        <Modal.Card.Title>Add a Cook Time</Modal.Card.Title>
                        <Delete onClick={this.props.toggleCookTimeModal} />
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
                                <Input onChange={this.handleFieldChange} id='hours' type='text' placeholder='Hours' />
                            </Field>
                            <Field>
                                <Input onChange={this.handleFieldChange} id='minutes' type='text' placeholder='Minutes' />
                            </Field>
                        </Content>
                    </Modal.Card.Body>
                    <Modal.Card.Foot>
                        <Button color="danger" onClick={this.saveCookTime}>Save</Button>
                        <Button onClick={this.props.toggleCookTimeModal}>Cancel</Button>
                    </Modal.Card.Foot>
                </Modal.Card>
            </Modal>
        )
    }
}