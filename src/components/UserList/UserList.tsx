import { useEffect, useState } from "react"
import { Button } from "../Button/Button"
import { getUsers } from "../../services/userService"
import { UserContainer } from "../UserContainer/UserContainer"

export interface User {
  id: string
  name: string
}

export const UserList = () => {
  const [people, setPeople] = useState<undefined | User[]>(undefined)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    const asyncFunction = async () => setPeople(await getUsers())
    asyncFunction()
  }, [])

  return (
    <>
      <label htmlFor="name-filter">Search:</label>
      <input
        id="name-filter"
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      ></input>

      <UserContainer people={people} filter={filter} />

      <Button
        text="Add"
        onClick={() =>
          setPeople(prevPeople => [
            ...(prevPeople as User[]),
            { id: "20", name: "Other User" },
          ])
        }
        disabled={!people}
      />
    </>
  )
}
