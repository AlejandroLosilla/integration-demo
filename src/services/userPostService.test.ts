import { readFile, writeFile } from "fs/promises";
import { saveUserPost } from "./userPostService";

const mockDb = {
    'userId1': {
        posts: ['postId1']
    },
    'userId2': {
        posts: ['postId2']
    }
}

jest.mock('fs/promises', () => ({
    ...jest.requireActual('fs/promises'),
    writeFile: jest.fn(),
    readFile: jest.fn(() => Promise.resolve(mockDb))
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

        expect(readFile).toHaveBeenCalledTimes(1)
        expect(writeFile).toHaveBeenCalledTimes(1)
        expect(writeFile).toHaveBeenCalledWith('../src/fakeDb.json', JSON.stringify(expectedJson))

    })
})