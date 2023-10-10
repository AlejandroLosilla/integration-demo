import { act, render, screen } from "@testing-library/react"
import { BrowserRouter, useParams } from "react-router-dom"
import { Post } from "./Post"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => ({ id: "1" })),
}))

const mockedSuccessResponse = {
  id: "1",
  title: "mockTitle",
  body: "mockBody",
}
const mockedFetch = {
  json: () => Promise.resolve(mockedSuccessResponse),
  status: 200,
}

const mockedFailedFetch = {
  json: () => Promise.resolve({}),
  status: 200,
}

// @ts-ignore
global.fetch = jest.fn()

describe("Post integration", () => {
  afterEach(() => jest.clearAllMocks())

  it("should update the post properly if id is matched", async () => {
    jest
      .mocked(global.fetch as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve(mockedFetch))
    await act(async () => {
      render(
        <BrowserRouter>
          <Post />
        </BrowserRouter>
      ) as any

      expect(useParams).toHaveBeenCalledTimes(1)
    })

    const heading = screen.getByText("Post 1")
    const title = await screen.findByText(mockedSuccessResponse.title)
    const body = await screen.findByText(mockedSuccessResponse.body)

    expect(heading).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(body).toBeInTheDocument()
  })

  it("should render 'not found' if no post was found", async () => {
    jest
      .mocked(global.fetch as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve(mockedFailedFetch))
    await act(async () => {
      render(
        <BrowserRouter>
          <Post />
        </BrowserRouter>
      ) as any

      expect(useParams).toHaveBeenCalledTimes(1)
    })

    expect(screen.getByText("No results found")).toBeInTheDocument()
  })
})
