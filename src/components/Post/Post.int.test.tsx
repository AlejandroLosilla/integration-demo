import { act, render, screen, findByText } from "@testing-library/react"
import { BrowserRouter, useParams } from "react-router-dom"
import { Post } from "./Post"

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ id: '1' }))
}))

describe('Post integration', () => {
  // it('should update the post properly if id is matched', async () => {
  //   await act(async () => {
  //     render(
  //       <BrowserRouter>
  //         <Post />
  //       </BrowserRouter>
  //     ) as any

  //     expect(useParams).toHaveBeenCalledTimes(1)
  //   })

  //   const post1 = {
  //     userId: 1,
  //     id: 1,
  //     title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  //     body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  //   }

  //   const heading = screen.getByText('Post 1')
  //   const title = await screen.findByText(post1.title)
  //   const body = await screen.findByText(post1.body)

  //   expect(heading).toBeInTheDocument()
  //   expect(title).toBeInTheDocument()
  //   expect(body).toBeInTheDocument()
  // })
})
