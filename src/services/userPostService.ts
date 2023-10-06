import { writeFile, readFile } from 'fs'

interface JsonObject {
    [key: string]: UserPost
}

interface UserPost {
    posts: string[]
}

export async function saveUserPost(userId: string, postId: string) {
    try {
        const json = await fs.readFile('../src/fakeDb.json', 'utf-8')
        console.log(json)
        const jsonObject = JSON.parse(json) as JsonObject

        jsonObject[userId] = jsonObject[userId] || { posts: [] }
        jsonObject[userId].posts.push(postId)

        await fs.writeFile('../src/fakeDb.json', JSON.stringify(jsonObject))
    } catch (err) {
        console.log('------>', err);
    }
}

export function getUserPosts(userId: string) {

}