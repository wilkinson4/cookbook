import React, { Component } from 'react';
import NavBar from '../nav/Navbar';
import { Input, Checkbox, Label, Control, Icon } from 'rbx';
import UserRecipeCard from './UserRecipeCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export default class UserRecipeList extends Component {

    state = {
        filterRecipeText: "",
        showMadeRecipes: false,
    }

    toggleMadeRecipes = () => {
        this.setState({ showMadeRecipes: !this.state.showMadeRecipes })
    }

    createMadeRecipesArray = () => {
        return this.props.usersRecipes.filter(recipe => recipe.rating > -1)
    }

    filterTags = () => {
        const filteredTags = this.props.usersTags.filter(tag => tag.name.includes(this.state.filterRecipeText))
        const filteredTagRelationships = this.props.tagRelationships.filter(tagRelationship => {
            return filteredTags.find(tag => tag.id === tagRelationship.tagId)
        })
        return filteredTagRelationships
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    componentDidMount() {
        this.props.getAllRecipes()
            .then(this.props.getAllUsers)
            .then(this.props.getUsersTags)
            .then(this.props.getTagRelationships)
    }

    render() {
        return (
            <>
                <NavBar />
                <main className='has-text-centered section' >
                    <section>
                        {/* Displays the modal if this.state.active === true */}
                        <h1 className='h1 is-size-3-mobile'>Your Recipes</h1>
                        <Control iconRight>
                            <Input id='filterRecipeText' onKeyUp={this.handleChange} type='text' placeholder='hungry for pasta?' />
                            <Icon size="small" align="right">
                                <FontAwesomeIcon icon={faSearch} />
                            </Icon>
                        </Control>
                        <p>or</p>
                        <Label>
                            <Checkbox onChange={this.toggleMadeRecipes} />View Made Recipes
                        </Label>
                    </section>
                    <section className='section'>
                        {
                            (this.state.filterRecipeText === "" && !this.state.showMadeRecipes)
                                ? this.props.usersRecipes.map(recipe =>
                                    <UserRecipeCard
                                        key={recipe.id}
                                        currentRecipe={this.props.currentRecipe}
                                        setCurrentRecipe={this.setCurrentRecipe}
                                        usersRecipes={this.props.usersRecipes}
                                        recipe={recipe}
                                        {...this.props}
                                        getAllRecipes={this.props.getAllRecipes}
                                        toggleModal={this.toggleModal}
                                    />
                                )
                                : this.state.showMadeRecipes
                                    ? this.createMadeRecipesArray().map(recipe =>
                                        <UserRecipeCard
                                            key={recipe.id}
                                            currentRecipe={this.props.currentRecipe}
                                            setCurrentRecipe={this.setCurrentRecipe}
                                            usersRecipes={this.props.usersRecipes}
                                            recipe={recipe}
                                            {...this.props}
                                            getAllRecipes={this.props.getAllRecipes}
                                            toggleModal={this.toggleModal}
                                        />
                                    )
                                    : this.filterTags().map(tagRelationship =>
                                        <UserRecipeCard
                                            key={tagRelationship.recipe.id}
                                            currentRecipe={this.props.currentRecipe}
                                            setCurrentRecipe={this.setCurrentRecipe}
                                            usersRecipes={this.props.usersRecipes}
                                            recipe={tagRelationship.recipe}
                                            {...this.props}
                                            getAllRecipes={this.props.getAllRecipes}
                                            toggleModal={this.toggleModal}
                                        />
                                    )
                        }
                    </section>
                </main>
            </>
        )
    }
}