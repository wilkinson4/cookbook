import React, { Component } from 'react';
import RecipeList from './RecipeList';
import GoogleRecipeManager from '../../modules/GoogleRecipeManager';
import RecipeManager from '../../modules/RecipeManager'
import NavBar from '../nav/Navbar';
import { Button, Input, Pagination, Field, Control, Icon } from 'rbx';
import RecipeModal from '../modal/RecipeModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export default class SearchNewRecipes extends Component {
    state = {
        recipeResultsFromGoogle: [],
        recipesFromAPI: [],
        active: false,
        currentPage: 0,
        searchTerm: "",
        loadingStatus: ''
    }

    handleSearch = (event) => {
        console.log(event.target.id)
        if (event.key === 'Enter' || event.target.id === 'search') {
            this.setState({ loadingStatus: 'loading' })
            GoogleRecipeManager.getRecipesFromGoogle(this.state.searchTerm)
                .then(recipeResultsFromGoogle => {
                    this.setState({
                        recipeResultsFromGoogle: recipeResultsFromGoogle.items,
                        currentPage: 0,
                    })
                })
        }
    }


    setLoadingStatusToFalse = () => {
        this.setState({ loadingStatus: '' })
    }

    handleClick = () => {
        const { active } = this.state;
        this.setState({ active: !active });
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    toggleModal = () => {
        this.setState({
            active: !this.state.active
        })
    }

    nextPage = () => {
        const nextPage = this.state.currentPage + 1
        GoogleRecipeManager.getNextTenResultsFromGoogle(this.state.searchTerm, nextPage * 10)
            .then(results => {
                this.setState({
                    recipeResultsFromGoogle: results.items,
                    currentPage: nextPage
                })
            })
    }

    previousPage = () => {
        if (this.state.currentPage !== 0) {
            const previousPage = this.state.currentPage - 1
            GoogleRecipeManager.getNextTenResultsFromGoogle(this.state.searchTerm, previousPage * 10)
                .then(results => {
                    this.setState({
                        recipeResultsFromGoogle: results.items,
                        currentPage: previousPage
                    })
                })
        } else {
            GoogleRecipeManager.getRecipesFromGoogle(this.state.searchTerm)
                .then(results => {
                    this.setState({
                        recipeResultsFromGoogle: results.items,
                        currentPage: 0
                    })
                })
        }

    }

    getRecipesFromAPI = () => {
        RecipeManager.getAll()
            .then(recipesInAPI => {
                this.setState({ recipesFromAPI: recipesInAPI })
            })
    }

    componentDidMount() {
        this.getRecipesFromAPI()
    }

    render() {
        return (
            <>
                <NavBar />
                <main className='has-text-centered section' >
                    {/* Displays the modal if this.state.active === true */}
                    {this.state.active
                        && <RecipeModal
                            toggleModal={this.toggleModal}
                            active={this.state.active}
                            getAllRecipes={this.props.getAllRecipes}
                            {...this.props}
                        />}
                    <h1 className='h1 is-size-3-mobile'>Google for Recipes</h1>
                    <Field id='googleSearch__field' kind="addons">
                        <Control>
                            <Input id='searchTerm' type='text' placeholder='search for a recipe' onKeyPress={this.handleSearch} onChange={this.handleChange} />
                        </Control>
                        <Control onClick={this.handleSearch} id='search'>
                            <Button static state={this.state.loadingStatus} >
                                <Icon>
                                    <FontAwesomeIcon icon={faSearch} size='xs' />
                                </Icon>
                                <span>Search</span>
                            </Button>
                        </Control>
                    </Field>
                    <p>or</p>
                    <Button onClick={this.toggleModal}>Add Your Own</Button>
                    {
                        this.state.recipeResultsFromGoogle.length > 0
                        && <RecipeList
                            recipeResults={this.state.recipeResultsFromGoogle}
                            recipesFromAPI={this.state.recipesFromAPI}
                            setLoadingStatusToFalse={this.setLoadingStatusToFalse}
                            {...this.props}
                        />

                    }
                </main>

                {this.state.recipeResultsFromGoogle.length > 0
                    && <footer className='pagination__footer section'>
                        <Pagination>
                            <Pagination.Step align="previous" onClick={this.previousPage}>Previous</Pagination.Step>
                            <Pagination.Step align="next" onClick={this.nextPage}>Next page</Pagination.Step>
                            <Pagination.List>
                                <Pagination.Link current>{this.state.currentPage + 1}</Pagination.Link>
                                <Pagination.Link>{this.state.currentPage + 2}</Pagination.Link>
                                <Pagination.Link>{this.state.currentPage + 3}</Pagination.Link>
                                <Pagination.Link>{this.state.currentPage + 4}</Pagination.Link>
                                <Pagination.Ellipsis />
                            </Pagination.List>
                        </Pagination>
                    </footer>
                }
            </>
        )
    }
}