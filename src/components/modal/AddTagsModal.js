import React, { Component } from 'react';
import { Modal, Delete, Content, Input, Field, Message } from 'rbx';
import Tag from '../tags/Tag'

export default class AddTagsModal extends Component {
    state = {
        tagName: "",
        displayError: "none",
        errorMessage: ""
    }

    handleSaveTag = (event) => {
        if (event.key === 'Enter') {
            event.target.value=""
            this.props.saveTag(this.state.tagName)
        }
    }

    handleFieldChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    render() {
        const displayErrorMessage = {
            display: this.state.displayError
        }
        return (
            <Modal active={this.props.active}>
                <Modal.Background onClick={this.props.toggleAddTagsModal} />
                <Modal.Card>
                    <Modal.Card.Head>
                        <Modal.Card.Title>Add Tags to Your Recipe</Modal.Card.Title>
                        <Delete onClick={this.props.toggleAddTagsModal} />
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
                                <Input onChange={this.handleFieldChange} id='tagName' type='text' placeholder='Tag name' onKeyUp={this.handleSaveTag} />
                            </Field>
                            <Field>
                                <h4>Current Tags:</h4>
                                {
                                    this.props.recipeTags.map(recipeTag =>
                                        <Tag
                                            key={recipeTag.id}
                                            deleteTag={this.props.deleteTag}
                                            tagRelationships={this.props.tagRelationships}
                                            recipeTag={recipeTag}
                                        />
                                    )

                                }

                            </Field>
                        </Content>
                    </Modal.Card.Body>
                    <Modal.Card.Foot>
                    </Modal.Card.Foot>
                </Modal.Card>
            </Modal>
        )
    }
}