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
import RecipeManager from '../../modules/RecipeManager';
import './RecipeDetails.css';
import AddRatingModalInDetails from '../modal/AddRatingModalInDetails';

export default class RecipeDetails extends Component {
    state = {
        notes: "",
        isSaveModalActive: false,
        isDeleteModalActive: false,
        isRatingModalActive: false,
        isEditNotesModalActive: false
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

    saveRecipeNotes = () => {
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

    componentDidMount() {
        this.props.getAllRecipes()
            .then(this.findRecipeToViewAndEdit)
    }

    render() {
        return (
            <>
                <NavBar />
                {
                    (this.props.currentRecipe.title !== "" && this.props.currentRecipe.imageURL !== "")
                    && <main className='has-text-centered section'>
                        {
                            this.state.isSaveModalActive &&
                            <SaveRecipeNotesModal
                                notes={this.state.notes}
                                toggleSaveRecipeNotesModal={this.toggleSaveModal}
                                active={this.state.isSaveModalActive}
                                saveRecipeNotes={this.saveRecipeNotes}
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

                        <Card>
                            <Card.Header>
                                <h3>{this.props.currentRecipe.title}</h3>
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
                                        <Icon>
                                            <FontAwesomeIcon icon={faPlus} size='xs' />
                                        </Icon>
                                    </Column>
                                </Column.Group>
                                <Column.Group className='has-text-left'>
                                    <Column>
                                        <p>...</p>
                                    </Column>
                                </Column.Group>
                                <Column.Group breakpoint='mobile' className='has-text-left'>
                                    <Column>
                                        <p>Notes:</p>
                                    </Column>
                                    <Column className='has-text-right'>
                                        <Icon onClick={this.toggleEditNotesModal}>
                                            <FontAwesomeIcon icon={faEdit} size='xs' />
                                        </Icon>
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