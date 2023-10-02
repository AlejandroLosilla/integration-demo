import { act, findByText, render, screen } from "@testing-library/react"
import { BrowserRouter, useParams } from "react-router-dom"
import { Post } from "./Post"
import { getPostById } from "../../services/postService"

const mockPost = {
  id: "::id::",
  title: "::title::",
  body: "::body::",
}

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => ({ id: "::id::" })),
}))

jest.mock("../../services/postService", () => ({
  getPostById: jest.fn(() => Promise.resolve(mockPost)),
}))

describe("Post", () => {
  beforeEach(() => {
    jest.mocked(getPostById).mockClear()
    jest.mocked(useParams).mockClear()
  })

  it("should render loading screen if post is empty", () => {
    render(
      <BrowserRouter>
        <Post />
      </BrowserRouter>
    )
    expect(screen.getByText(/post/i)).toBeInTheDocument()

    const link = screen.getByText("Back to Home")
    expect(link).toBeInTheDocument()
    expect(link).toBeInstanceOf(HTMLAnchorElement)
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  it("should render a post properly if there is an id", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Post />
        </BrowserRouter>
      ) as any

      expect(useParams).toHaveBeenCalledTimes(1)
    })

    expect(getPostById).toHaveBeenCalledWith("::id::")
    const title = await screen.findByText(mockPost.title)
    expect(screen.getByText("Post ::id::")).toBeInTheDocument()

    const link = screen.getByText("Back to Home")
    expect(link).toBeInTheDocument()
    expect(link).toBeInstanceOf(HTMLAnchorElement)
    expect(title).toBeInTheDocument()
    expect(screen.getByText(mockPost.body)).toBeInTheDocument()
  })
})
