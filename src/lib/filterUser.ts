import { User } from "../components/UserList/UserList"

export function filterUser(filter: string, userList: User[]) {
    if (filter === '') return userList

    return userList.filter(user => user.name === filter)
}