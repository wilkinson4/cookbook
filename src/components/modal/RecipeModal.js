import React, { Component } from 'react';
import RecipeManager from '../../modules/RecipeManager';
import { Modal, Delete, Content, Textarea, Button, Input, Field, Message } from 'rbx';

export default class RecipeModal extends Component {
    state = {
        title: "",
        link: "",
        description: "",
        imageURL: "",
        cookTime: "",
        displayError: "none",
        errorMessage: ""
    }
    handleFieldChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }
    saveRecipe = () => {
        const urlValidation = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\\.-]+)+[\w\-\\._~:/?#[\]@!\\$&'\\(\\)\\*\\+,;=.]+$/gm
        const imageURLValidation = /(https?:\/\/.*\.(?:png|jpg))/
        if (this.state.title === "" || this.state.link === "" || this.state.description === "") {
            this.setState({
                displayError: "block",
                errorMessage: "Please fill out all fields."
            })
        } else if (!urlValidation.test(this.state.link)) {
            this.setState({
                displayError: "block",
                errorMessage: "Please enter a valid link address."
            })
        } else if (this.state.imageURL.length > 0 && !imageURLValidation.test(this.state.imageURL)) {
            this.setState({
                displayError: "block",
                errorMessage: "Please enter a valid image link address."
            })
        } else {
            const newRecipeObj = {
                title: this.state.title,
                link: this.state.link,
                userId: parseInt(sessionStorage.getItem("activeUser")),
                description: this.state.description,
                imageURL: this.state.imageURL,
                cookTime: "",
                tags: [],
                rating: -1,
                notes: ""
            }
            RecipeManager.saveRecipe(newRecipeObj)
                .then(this.props.getAllRecipes)
                .then(this.props.history.push('/recipes'))
        }
    }

    render() {
        const displayErrorMessage = {
            display: this.state.displayError
        }
        return (
            <Modal active={this.props.active}>
                <Modal.Background onClick={this.props.toggleModal} />
                <Modal.Card>
                    <Modal.Card.Head>
                        <Modal.Card.Title>Add Your Own Recipe</Modal.Card.Title>
                        <Delete onClick={this.props.toggleModal} />
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
                                <Input type='text' id="title" onChange={this.handleFieldChange} placeholder='recipe title'></Input>
                            </Field>
                            <Field>
                                <Input type='text' id="link" onChange={this.handleFieldChange} placeholder='link to recipe'></Input>
                            </Field>
                            <Field>
                                <Input type='text' id="imageURL" onChange={this.handleFieldChange} placeholder='image link'></Input>
                            </Field>
                            <Field>
                                <Textarea rows={10} id="description" onChange={this.handleFieldChange} placeholder="Recipe Description" />
                            </Field>
                        </Content>
                    </Modal.Card.Body>
                    <Modal.Card.Foot>
                        <Button color="success" onClick={this.saveRecipe}>Save Recipe</Button>
                        <Button onClick={this.props.toggleModal}>Cancel</Button>
                    </Modal.Card.Foot>
                </Modal.Card>
            </Modal>
        )
    }
}