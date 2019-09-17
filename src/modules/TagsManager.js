const remoteURL = "http://localhost:8088"

const TagData = {
    addTag(tag) {
        return fetch(`${remoteURL}/tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        })
            .then(result => result.json())
    },
    getAllUsersTags(userId) {
        return fetch(`${remoteURL}/tags?userId=${userId}`)
            .then(result => result.json())
    }
}

export default TagData