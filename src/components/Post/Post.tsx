import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPostById } from "../../services/postService"

export const Post = (): JSX.Element => {
  const { id } = useParams()
  const [post, setPost] = useState<any>()

  useEffect(() => {
    if (id) {
      ;(async () => {
        setPost(await getPostById(id))
      })()
    }
  }, [id])

  if (!post)
    return (
      <div>
        <h1>Post {id}</h1>
        <p>Loading...</p>
        <Link to="/post">Back to Home</Link>
      </div>
    )

  if (post.notFound)
    return (
      <div>
        <h1>No results found</h1>
        <Link to="/post">Back to Home</Link>
      </div>
    )

  return (
    <div>
      <h1>Post {id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to="/post">Back to Home</Link>
    </div>
  )
}
