import React, { Component } from 'react';
import RecipeManager from '../../modules/RecipeManager';
import { Modal, Delete, Content, Textarea, Button, Input, Field } from 'rbx';

export default class RecipeModal extends Component {
    state = {
        title: "",
        link: "",
        description: "",
        imageURL: "",
    }
    handleFieldChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
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
            .then(this.props.history.push('/recipes'))
    }

    render() {
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