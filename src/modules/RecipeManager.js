const remoteURL = "https://damp-fortress-76293.herokuapp.com"

const RecipeData = {
    getSingleRecipe(id) {
        return fetch(`${remoteURL}/recipes/${id}`)
            .then(result => result.json())
    },
    getRecipesFromSearch(recipeObjProperty, string) {
        return fetch(`${remoteURL}/recipes?${recipeObjProperty}=${string}`)
            .then(result => result.json())
    },
    getAll() {
        return fetch(`${remoteURL}/recipes`)
            .then(result => result.json())
    },
    saveRecipe(recipe) {
        return fetch(`${remoteURL}/recipes/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipe)
        })
            .then(result => result.json())
    },
    deleteRecipe(recipeId) {
        return fetch(`${remoteURL}/recipes/${recipeId}`, {
            method: "DELETE"
        })
            .then(result => result.json())
    },
    updateRecipe(updatedRecipe) {
        return fetch(`${remoteURL}/recipes/${updatedRecipe.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedRecipe)
        })
            .then(result => result.json())
    }
}

export default RecipeData