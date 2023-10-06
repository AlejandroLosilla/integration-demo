import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

interface JsonObject {
    [key: string]: UserPost
}

interface UserPost {
    posts: string[]
}

export async function saveUserPost(userId: string, postId: string) {
    try {
        const json = readFileSync(resolve(process.cwd(), 'src', 'fakeDb.json'), 'utf-8')
        const jsonObject = JSON.parse(json) as JsonObject

        jsonObject[userId] = jsonObject[userId] || { posts: [] }
        jsonObject[userId].posts.push(postId)

        writeFileSync(resolve(process.cwd(), 'src', 'fakeDb.json'), JSON.stringify(jsonObject))
    } catch (err) {
        console.log('------>', err);
    }
}

export function getUserPosts(userId: string): UserPost{
    const json = readFileSync(resolve(process.cwd(), 'src', 'fakeDb.json'), 'utf-8')
    const jsonObject = JSON.parse(json) as JsonObject
    if (jsonObject[userId] === undefined) {
        throw Error('user does not exists')
    }
    return jsonObject[userId]
}