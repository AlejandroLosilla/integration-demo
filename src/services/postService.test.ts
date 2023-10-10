import { getPostById } from './postService';

const mockedSuccessResponse = '::mockedSuccessResponse::';
const mockedFetch = {
    json: () => Promise.resolve(mockedSuccessResponse),
    status: 200,
};

const mockedFailedFetch = {
    json: () => Promise.resolve({}),
    status: 200,
};

// @ts-ignore
global.fetch = jest.fn();

afterEach(() => {
    jest.clearAllMocks();
});

describe('getPostById', () => {
    test('should call getPostById and return users', async () => {
        const postId = '::postId::';
        (global.fetch as jest.Mock).mockImplementation(() => Promise.resolve(mockedFetch));
        const fetchCall = await getPostById(postId);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(fetchCall).toEqual(mockedSuccessResponse);
    });

    it('should return an object with notFound property if the id is not matched', async () => {
      (global.fetch as jest.Mock).mockImplementation(() => Promise.resolve(mockedFailedFetch))
      const fetchedPost = await getPostById('0')

      expect(fetchedPost).toHaveProperty('notFound', true)
    })
});
