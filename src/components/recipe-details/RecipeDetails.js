import React, { Component } from 'react';
import NavBar from '../nav/Navbar';
import { Card, Icon, Column, Textarea, Button, Tile, Box } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import StarRatingComponent from 'react-star-rating-component';
import SaveRecipeNotesModal from '../modal/ConfirmSaveModal';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal'
import EditNotesModal from '../modal/EditNotesModal';
import AddTagsModal from '../modal/AddTagsModal';
import RecipeManager from '../../modules/RecipeManager';
import Tag from '../tags/Tag';
import TagsManager from '../../modules/TagsManager';
import TagsRecipesManager from '../../modules/TagsRecipesManager';
import './RecipeDetails.css';
import AddRatingModalInDetails from '../modal/AddRatingModalInDetails';

export default class RecipeDetails extends Component {
    state = {
        notes: "",
        allTags: [],
        usersTags: [],
        tagRelationships: [],
        allTagRelationships: [],
        recipeTags: [],
        isSaveModalActive: false,
        isDeleteModalActive: false,
        isRatingModalActive: false,
        isEditNotesModalActive: false,
        isTagsModalActive: false,
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    toggleSaveModal = () => {
        this.setState({ isSaveModalActive: !this.state.isSaveModalActive })
    }

    toggleDeleteModal = () => {
        this.setState({ isDeleteModalActive: !this.state.isDeleteModalActive })
    }

    toggleRatingModal = () => {
        this.setState({ isRatingModalActive: !this.state.isRatingModalActive })
    }

    toggleEditNotesModal = () => {
        this.setState({ isEditNotesModalActive: !this.state.isEditNotesModalActive })
    }

    toggleAddTagsModal = () => {
        this.setState({ isTagsModalActive: !this.state.isTagsModalActive })
    }

    saveRecipeTags = () => {
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
        return RecipeManager.updateRecipe(updatedRecipe)
            .then(updatedRecipe => this.props.setCurrentRecipe(updatedRecipe))
            .then(this.toggleSaveModal)
    }

    deleteRecipeAndRedirect = () => {
        this.props.deleteRecipe(this.props.currentRecipe.id)
            .then(this.props.history.push('/recipes'))
    }

    saveTag = (tagName) => {
        const newTag = {
            userId: parseInt(sessionStorage.getItem('activeUser')),
            name: tagName.toLowerCase()
        }

        TagsManager.addTag(newTag)
            .then(tag => {
                const newTagRecipeRelationship = {
                    recipeId: this.props.currentRecipe.id,
                    tagId: tag.id
                }
                TagsRecipesManager.addTagRecipeRelationship(newTagRecipeRelationship)
                    .then(this.componentDidMount())
            })
    }

    deleteTag = (tagRelationshipId) => {
        TagsRecipesManager.deleteTagRelationship(tagRelationshipId)
            .then(this.init)
    }

    getAllTagRelationships = () => {
        return TagsRecipesManager.getAll()
    }

    getAllTags = () => {
        return TagsManager.getAllTags()
    }

    init = () => {
        this.props.getAllRecipes()
            .then(this.getAllTags)
            .then(allTags => {
                this.getAllTagRelationships()
                    .then(allTagRelationships => {
                        const activeUserId = parseInt(sessionStorage.getItem('activeUser'))
                        const userTags = allTags.filter(tag => tag.userId === activeUserId)
                        const tagRelationships = allTagRelationships.filter(tagRelationship => tagRelationship.recipeId === this.props.currentRecipe.id)
                        this.setState({
                            usersTags: userTags,
                            allTags: allTags,
                            tagRelationships: tagRelationships,
                            allTagRelationships: allTagRelationships,
                            recipeTags: userTags.filter(userTag => {
                                return tagRelationships.find(tagRelationship => tagRelationship.tagId === userTag.id)
                            })
                        })
                    })
            })
    }

    componentDidMount() {
        this.init()
    }

    render() {
        return (
            <>
                <NavBar />
                {
                    (this.props.currentRecipe.title !== "")
                    && <main className='has-text-centered section'>
                        {/* =========== */}
                        {/* MODALS START */}
                        {/* =========== */}
                        {
                            this.state.isSaveModalActive &&
                            <SaveRecipeNotesModal
                                notes={this.state.notes}
                                toggleSaveRecipeNotesModal={this.toggleSaveModal}
                                setCurrentRecipe={this.props.setCurrentRecipe}
                                currentRecipe={this.props.currentRecipe}
                                active={this.state.isSaveModalActive}
                                findRecipeToViewAndEdit={this.findRecipeToViewAndEdit}
                            />

                        }
                        {
                            this.state.isDeleteModalActive &&
                            <ConfirmDeleteModal
                                toggleDeleteModal={this.toggleDeleteModal}
                                active={this.state.isDeleteModalActive}
                                deleteRecipe={this.deleteRecipeAndRedirect}
                            />
                        }

                        {
                            this.state.isRatingModalActive &&
                            <AddRatingModalInDetails
                                setCurrentRecipe={this.props.setCurrentRecipe}
                                toggleAddRatingModal={this.toggleRatingModal}
                                active={this.state.isRatingModalActive}
                                recipe={this.props.currentRecipe}
                                getAllRecipes={this.props.getAllRecipes}
                            />
                        }

                        {
                            this.state.isEditNotesModalActive &&
                            <EditNotesModal
                                setCurrentRecipe={this.props.setCurrentRecipe}
                                toggleEditNotesModal={this.toggleEditNotesModal}
                                active={this.state.isEditNotesModalActive}
                                currentRecipe={this.props.currentRecipe}
                                recipeNotes={this.props.currentRecipe.notes}
                            />
                        }

                        {
                            this.state.isTagsModalActive &&
                            <AddTagsModal
                                active={this.state.isTagsModalActive}
                                deleteTag={this.deleteTag}
                                tagRelationships={this.state.tagRelationships}
                                recipeTags={this.state.recipeTags}
                                recipe={this.props.currentRecipe}
                                saveTag={this.saveTag}
                                toggleAddTagsModal={this.toggleAddTagsModal}
                            />
                        }
                        {/* =========== */}
                        {/* MODALS END */}
                        {/* =========== */}
                        <Card>
                            <Card.Header>
                                <a className='cardTitle__a' href={this.props.currentRecipe.link}>
                                    <h3>{this.props.currentRecipe.title}</h3>
                                </a>
                                <Icon onClick={this.toggleDeleteModal}>
                                    <FontAwesomeIcon icon={faTimes} size='xs' />
                                </Icon>
                            </Card.Header>
                            <Card.Content>
                                <Column.Group breakpoint='mobile'>
                                    <Column>
                                        <img src={this.props.currentRecipe.imageURL} alt={this.props.currentRecipe.title} />
                                    </Column>
                                    <Column>
                                        <p className='is-size-7'>{this.props.currentRecipe.description}</p>
                                    </Column>
                                </Column.Group>
                                <Column.Group breakpoint='mobile'>
                                    <Column className='has-text-left'>
                                        <p>Rating</p>
                                        {
                                            this.props.currentRecipe.rating > -1
                                                ? <div className='userStarRating__div' onClick={this.toggleRatingModal}>
                                                    <StarRatingComponent
                                                        name="rate2"
                                                        editing={false}
                                                        starCount={5}
                                                        value={this.props.currentRecipe.rating}
                                                    />
                                                </div>
                                                : <Button onClick={this.toggleRatingModal}>Add Rating</Button>
                                        }
                                    </Column>
                                    <Column className='has-text-right'>
                                        <p>Cook Time</p>
                                        {this.props.currentRecipe.cookTime !== ""
                                            ? <p>{this.props.currentRecipe.cookTime}</p>
                                            : <p>...</p>
                                        }
                                    </Column>
                                </Column.Group>
                                <Column.Group breakpoint='mobile'>
                                    <Column className='has-text-left'>
                                        <p>Tags:</p>
                                    </Column>
                                    <Column className='has-text-right'>
                                        <Icon onClick={this.toggleAddTagsModal}>
                                            <FontAwesomeIcon icon={faPlus} size='xs' />
                                        </Icon>
                                    </Column>
                                </Column.Group>
                                <Column.Group className='has-text-left'>
                                    <Column>
                                        {
                                            this.state.recipeTags.length > 0
                                            && this.state.recipeTags.map(recipeTag => {
                                                return <Tag
                                                    key={recipeTag.id}
                                                    recipeTag={recipeTag}
                                                    tagRelationships={this.state.tagRelationships}
                                                    deleteTag={this.deleteTag}
                                                />
                                            })
                                        }
                                    </Column>
                                </Column.Group>
                                <Column.Group breakpoint='mobile' className='has-text-left'>
                                    <Column>
                                        <p>Notes:</p>
                                    </Column>
                                    <Column className='has-text-right'>
                                        {this.props.currentRecipe.notes !== ""
                                            && <Icon onClick={this.toggleEditNotesModal}>
                                                <FontAwesomeIcon icon={faEdit} size='xs' />
                                            </Icon>
                                        }
                                    </Column>
                                </Column.Group>
                                {this.props.currentRecipe.notes !== ""
                                    ? <Tile className='has-text-left' id='recipeNotes__tile' kind='parent'>
                                        <Tile as={Box} kind='child'>
                                            <p>{this.props.currentRecipe.notes}</p>
                                        </Tile>
                                    </Tile>
                                    : <Textarea id='notes' onChange={this.handleChange} rows={10} placeholder='Add some notes for next time...' />
                                }
                                <Column>
                                    <Button onClick={this.toggleSaveModal}>Save</Button>
                                </Column>
                            </Card.Content>
                        </Card>
                    </main>
                }
            </>
        )
    }
}