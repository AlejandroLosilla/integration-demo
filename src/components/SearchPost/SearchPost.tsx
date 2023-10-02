import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../Button/Button"

export const SearchPost = (): JSX.Element => {
  const navigate = useNavigate()
  const [postId, setPostId] = useState<string>("")
  return (
    <div>
      <h1>Welcome!</h1>
      <h2>Search for a post by its ID</h2>

      <label htmlFor="postId">Post ID: </label>
      <input
        id="postId"
        value={postId}
        onChange={e => setPostId(e.target.value)}
      />
      <Button
        text="Submit"
        onClick={() => navigate(`/post/${postId}`)}
        disabled={!postId}
      />
    </div>
  )
}
