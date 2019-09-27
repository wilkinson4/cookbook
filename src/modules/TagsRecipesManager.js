const remoteURL = "https://damp-fortress-76293.herokuapp.com"

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
    getAll() {
        return fetch(`${remoteURL}/tagsRecipes?_expand=recipe`)
            .then(result => result.json())
    },
    deleteTagRelationship(tagRelationhipId) {
        return fetch(`${remoteURL}/tagsRecipes/${tagRelationhipId}`, {
            method: "DELETE"
        })
            .then(result => result.json())
    }
}

export default TagsRecipesData