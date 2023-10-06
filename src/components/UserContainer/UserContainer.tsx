import { filterUser } from "../../lib/filterUser"
import { User } from "../UserList/UserList"

interface UserContainerProps {
  people: User[] | undefined
  filter: string
}

export const UserContainer = ({ people, filter }: UserContainerProps) => {
  if (!people) return <p>Loading users...</p>

  if (!people.length) return <p>There are no users</p>

  const filteredList = filterUser(filter, people)
  if (!filteredList.length) return <p>No results found for {filter}</p>

  return (
    <ul>
      {filteredList.map((person: any) => (
        <li key={person.id}>{person.name} </li>
      ))}
    </ul>
  )
}
