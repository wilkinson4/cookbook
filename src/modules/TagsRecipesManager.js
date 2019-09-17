const remoteURL = "http://localhost:8088"

const TagsRecipesData = { 
    addTagRecipeRelationship(tagsRecipes) {
        return fetch(`${remoteURL}/tagsRecipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagsRecipes)
        })
            .then(result => result.json())
    },
    getAllUsersTagsRelationshipsForRecipe(recipeId) {
        return fetch(`${remoteURL}/tagsRecipes?recipeId=${recipeId}`)
            .then(result => result.json())
    }
}

export default TagsRecipesData