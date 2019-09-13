const remoteURL = "http://localhost:8088"

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
    updateRecipeRating(recipeWithUpdatedRating) {
        return fetch(`${remoteURL}/recipes/${recipeWithUpdatedRating.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipeWithUpdatedRating)
        })
            .then(result => result.json())
    }
}

export default RecipeData