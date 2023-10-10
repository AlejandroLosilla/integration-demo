import { readFileSync, writeFileSync } from "fs";
import { getUserPosts, saveUserPost } from "./userPostService";
import { resolve } from "path";

const mockDb = {
    'userId1': {
        posts: ['postId1']
    },
    'userId2': {
        posts: ['postId2']
    }
}

jest.mock('fs', () => ({
    ...jest.requireActual('fs'),
    writeFileSync: jest.fn(),
    readFileSync: jest.fn(() => JSON.stringify(mockDb))
}))

describe('saveUserPost', () => {
    it('should update an existing user in the database', async () => {
        const newPost = 'postId3'
        const userId = 'userId1'
        const expectedJson = {
            ...mockDb,
            'userId1': {
                posts: ['postId1', 'postId3']
            }
        }

        await saveUserPost(userId, newPost)

        expect(readFileSync).toHaveBeenCalledTimes(1)
        expect(writeFileSync).toHaveBeenCalledTimes(1)
        expect(writeFileSync).toHaveBeenCalledWith(resolve(process.cwd(), 'src', 'fakeDb.json'), JSON.stringify(expectedJson))

    })
})

describe('getUserPosts', () => {
    test('should return user posts in the databse', () => {
        const result = getUserPosts('userId1')
        expect(result).toEqual(mockDb['userId1'])
    })
    test('should throw an error if userId does not exists in database', () => {
        // const result = getUserPosts('userId3')
        // console.log({result})
        expect(() => getUserPosts('userId3')).toThrowError()
    })
})