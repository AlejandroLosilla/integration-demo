import { getPostById } from "./postService";

describe('getPostById', () => {
    it('should return a post with matching id when it exists', async () => {
        const id = "1"
        const fetchedPost = await getPostById(id)

        expect(fetchedPost).toHaveProperty('id', 1)
    })
})
