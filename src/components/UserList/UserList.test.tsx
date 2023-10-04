import { render, screen, act, fireEvent } from "@testing-library/react"
import { UserList } from "./UserList"
import { getUsers } from "../../services/userService"
import { Button } from "../Button/Button"
import { filterUser } from "../../lib/filterUser"

const users = [
  { id: 1, name: "Pepa juana" },
  { id: 2, name: "juana" },
  { id: 3, name: "Pepa" },
]

jest.mock("../../services/userService", () => ({
  getUsers: jest.fn(() => Promise.resolve(users)),
}))

jest.mock("../../lib/filterUser", () => ({
  filterUser: jest.fn(() => users),
}))

jest.mock("../Button/Button", () => ({
  Button: jest.fn(() => <div>::Button::</div>),
}))

afterEach(() => {
  jest.clearAllMocks()
})
describe("UserList unit", () => {
  it("should not render UserList component", () => {
    render(<UserList />)
    const linkElement = screen.queryByRole("list")
    expect(linkElement).not.toBeInTheDocument()
  })

  it("should render UserList component after call our getUser service", async () => {
    await act(async () => render(<UserList />) as any)
    expect(getUsers).toHaveBeenCalledTimes(1)
    expect(screen.getByRole("list")).toBeInTheDocument()
    expect(screen.getAllByRole("listitem")).toHaveLength(3)
    expect(Button).toBeCalledTimes(1)
    expect(filterUser).toBeCalledTimes(1)
    expect(filterUser).toBeCalledWith("", users)
  })

  it("should update filter when user types within input", async () => {
    await act(async () => render(<UserList />) as any)

    const input = screen.getByLabelText("Search:") as HTMLInputElement
    fireEvent.change(input, { target: { value: "::Filter::" } })

    const newInput = screen.getByLabelText("Search:") as HTMLInputElement
    expect(newInput.value).toStrictEqual("::Filter::")
  })
})
