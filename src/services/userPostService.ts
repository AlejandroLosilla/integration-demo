interface JsonObject {
    [key: string]: UserPost
}

interface UserPost {
    posts: string[]
}

let fakeDb: { [key: string]: any } = {}

export async function saveUserPost(userId: string, postId: string) {
    try {
        const jsonObject = fakeDb

        jsonObject[userId] = jsonObject[userId] || { posts: [] }
        jsonObject[userId].posts.push(postId)

        fakeDb = jsonObject
    } catch (err) {
        console.log('------>', err);
    }
}

export function getUserPosts(userId: string): UserPost{
    const jsonObject = fakeDb
    if (jsonObject[userId] === undefined) {
        throw Error('user does not exists')
    }
    return jsonObject[userId]
}