export const getPostById = async (postId?: string): Promise<any> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  
  const data = await response.json();

  if (Object.keys(data).length === 0) {
    return { notFound: true }
  }
  return data
};