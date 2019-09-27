const remoteURL = "http://localhost:4000"

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