import React, { Component } from 'react';
import { Modal, Delete, Content, Input, Field, Message } from 'rbx';
import Tag from '../tags/Tag'
import TagsManager from '../../modules/TagsManager';
import TagsRecipesManager from '../../modules/TagsRecipesManager';

export default class AddTagsModal extends Component {
    state = {
        tagName: "",
        displayError: "none",
        usersTags: [],
        tagRelationships: [],
        recipeTags: [],
        errorMessage: ""
    }

    saveTag = (event) => {
        if (event.key === 'Enter') {
            const newTag = {
                userId: parseInt(sessionStorage.getItem('activeUser')),
                name: this.state.tagName
            }

            TagsManager.addTag(newTag)
                .then(tag => {
                    const newTagRecipeRelationship = {
                        recipeId: this.props.recipe.id,
                        tagId: tag.id
                    }
                    TagsRecipesManager.addTagRecipeRelationship(newTagRecipeRelationship)
                })
        }
    }

    handleFieldChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    getAllTagRelationshipsForThisRecipe = () => {
        return TagsRecipesManager.getAllUsersTagsRelationshipsForRecipe(this.props.recipe.id)
    }

    getAllTags = () => {
        const activeUserId = parseInt(sessionStorage.getItem('activeUser'))
        return TagsManager.getAllUsersTags(activeUserId)
    }

    componentDidMount() {
        this.getAllTags()
            .then(usersTags => {
                this.getAllTagRelationshipsForThisRecipe()
                    .then(tagRelationships => {
                        this.setState({
                            usersTags: usersTags,
                            tagRelationships: tagRelationships,
                            recipeTags: usersTags.filter(userTag => {
                                return tagRelationships.find(tagRelationship => userTag.id === tagRelationship.tagId)
                            })
                        })
                    })
            })
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
                                <Input onChange={this.handleFieldChange} id='tagName' type='text' placeholder='Tag name' onKeyUp={this.saveTag} />
                            </Field>
                            <Field>
                                <h4>Current Tags:</h4>
                                {
                                    this.state.recipeTags.map(recipeTag =>
                                        <Tag
                                            key={recipeTag.id}
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