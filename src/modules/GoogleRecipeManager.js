const url = 'https://www.googleapis.com/customsearch/v1'

const GoogleRecipeManager = {
    getRecipesFromGoogle(recipeToSearch) {
        return fetch(`${url}?key=${process.env.REACT_APP_API_KEY}&q=${recipeToSearch}+recipes`)
            .then(result => result.json())
    }
}

export default GoogleRecipeManager