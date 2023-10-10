import React, { useEffect, useState } from "react"
import { User } from '../UserList/UserList';
import { Post } from '../PostList/PostList';
import { getUsers } from "../../services/userService";
import { getAllPosts } from '../../services/postService';
import { Button } from "../Button/Button";
import { saveUserPost } from "../../services/userPostService";

export const AddPost = () => {
    const [users, setUsers] = useState<User[]>([])
    const [posts, setPosts] = useState<Post[]>([])
    const [selectedUserId, setSelectedUserId] = useState<string>('')
    const [selectedPostId, setSelectedPostId] = useState<string>('')

    const onSave = () => {
        console.log('saving', {selectedPostId}, {selectedUserId})
        if (selectedUserId && selectedPostId) {
            saveUserPost(selectedUserId, selectedPostId)
        }
    }

    useEffect(() => {
        const initData = async () => {
            const _users = await getUsers()
            const _posts = await getAllPosts()
            setUsers(_users)
            setPosts(_posts)
            setSelectedUserId(_users[0].id)
            setSelectedPostId(_posts[0].id)
        } 
        initData()
    }, [])

    return (
        <>
            <select onChange={(e) => setSelectedUserId(e.target.value)}>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <select onChange={(e) => setSelectedPostId(e.target.value)}>
                {posts.map(post => (
                    <option key={post.id} value={post.id}>{post.title}</option>
                ))}
            </select>
            <Button text="test" onClick={onSave} />
        </>
    )
}