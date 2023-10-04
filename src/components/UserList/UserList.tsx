import { useEffect, useState } from "react"
import { Button } from "../Button/Button"
import { getUsers } from "../../services/userService"
import { filterUser } from "../../lib/filterUser"

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

  if (!people) {
    return null
  }

  const filteredList = filterUser(filter, people)
  return (
    <>
      <label htmlFor="name-filter">Search:</label>
      <input
        id="name-filter"
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      ></input>
      <ul>
        {filteredList.map((person: any) => (
          <li key={person.id}>{person.name} </li>
        ))}
      </ul>
      <Button
        text="Add"
        onClick={() => setPeople([...people, { id: "20", name: "Other User" }])}
      />
    </>
  )
}
