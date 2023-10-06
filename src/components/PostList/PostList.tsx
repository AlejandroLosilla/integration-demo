// import { useEffect, useState } from "react"
// import { getAllPosts } from "../../services/postService"

export interface Post {
  id: string
  title: string
  body: string
}

// export const UserList = () => {
//   const [posts, setPosts] = useState<undefined | Post[]>(undefined)
//   const [filter, setFilter] = useState("")

//   useEffect(() => {
//     const asyncFunction = async () => setPosts(await getAllPosts())
//     asyncFunction()
//   }, [])

//   if (!posts) return <p>Loading posts...</p>

//   if (!posts.length) return <p>There are no posts</p>

//   const filteredList = filterUser(filter, people)
//   if (!filteredList.length) return <p>No results found for {filter}</p>

//   return (
//     <ul>
//       {filteredList.map((person: any) => (
//         <li key={person.id}>{person.name} </li>
//       ))}
//     </ul>
//   )

//   return (
//     <>
//       <UserContainer people={people} filter={filter} />
//     </>
//   )
// }
