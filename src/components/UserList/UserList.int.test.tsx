import { render, screen, act, fireEvent, within } from "@testing-library/react"
import { UserList } from "./UserList"
import { getUsers } from "../../services/userService"
import { Button } from "../Button/Button"

const users = [
  { id: 1, name: "Pepa juana" },
  { id: 2, name: "juana" },
  { id: 3, name: "Pepa" },
]
const mockedFetch = {
  json: () => Promise.resolve(users),
  status: 200,
}

// @ts-ignore
global.fetch = jest.fn()

jest.mock("../../services/userService", () => ({
  ...jest.requireActual("../../services/userService"),
}))

describe("UserList integration", () => {
  it("should get and render users properly", async () => {
    ;(global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockedFetch)
    )
    await act(async () => {
      render(<UserList />) as any
    })

    expect(screen.getByRole("list")).toBeInTheDocument()
    const listUsers = screen.getAllByRole("listitem")
    listUsers.forEach((user: any, idx) => {
      expect(user).toHaveTextContent(users[idx].name)
    })
  })

  describe("Button integration", () => {
    it("Button renders properly", async () => {
      await act(async () => {
        render(<UserList />) as any
      })

      expect(screen.getByText("Add")).toBeInTheDocument()
    })

    it("Button should add the default user on click", async () => {
      await act(async () => {
        render(<UserList />) as any
      })

      const list = screen.getByRole("list")
      const listUsers = within(list).getAllByRole("listitem")
      expect(listUsers.length).toStrictEqual(users.length)

      const button = screen.getByText("Add")
      fireEvent.click(button)

      const updatedListUsers = within(list).getAllByRole("listitem")
      expect(updatedListUsers.length).toStrictEqual(users.length + 1)
      expect(updatedListUsers[updatedListUsers.length - 1]).toHaveTextContent(
        "Other User"
      )
    })
  })

  describe("filterUser integration", () => {
    beforeAll(() =>
      jest.mock("../../services/userService", () => ({
        getUsers: jest.fn(() => users),
      }))
    )

    it("should filter users properly", async () => {
      await act(async () => {
        render(<UserList />) as any
      })
      const input = screen.getByLabelText("Search:")
      fireEvent.change(input, { target: { value: "Pepa juana" } })

      expect(screen.getByText("Pepa juana")).toBeInTheDocument()
    })

    it("should return an empty list if no users are matched", async () => {
      await act(async () => {
        render(<UserList />) as any
      })
      const input = screen.getByLabelText("Search:")
      fireEvent.change(input, { target: { value: "usuario" } })

      expect(
        screen.getByText("No results found for usuario")
      ).toBeInTheDocument()
    })
  })
})
