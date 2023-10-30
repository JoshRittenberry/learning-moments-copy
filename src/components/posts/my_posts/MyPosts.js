import "./MyPosts.css"
import { useEffect, useState } from "react"
import { Post } from "../Post"
import { getAllUserPosts } from "../../../services/postService"
import { PostFilter } from "../PostFilter"
import { PostSeach } from "../PostSearch"

export const MyPosts = ({ currentUser }) => {
    const [myPosts, setMyPosts] = useState([])
    const [showPosts, setShowPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        getAllUserPosts(currentUser.id).then(postArray => {
            setMyPosts(postArray)
            setShowPosts(postArray)
        })
    }, [])

    useEffect(() => {
        const filterPostsBySearch = () => {
            const filteredPosts = showPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()))
            setShowPosts(filteredPosts)

            if (searchTerm === "") {
                setShowPosts(myPosts)
            }
        }
        filterPostsBySearch()
    }, [searchTerm])

    const filterPostsByTopic = (topic) => {
        if (topic === "All Posts") {
            return setShowPosts(myPosts)
        }
        const filteredPosts = myPosts.filter(post => post.topic.name === topic)
        setShowPosts(filteredPosts)
    }

    return (
        <section className="posts-container">
            <header className="posts-header">
                <PostFilter filterPostsByTopic={filterPostsByTopic} />
                <PostSeach setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            </header>
            <article className="posts">
                {showPosts.map(postObj => {
                    return (
                        <div key={postObj.id}>
                            <Post post={postObj} currentUserId={currentUser.id}/>
                        </div>
                    )
                })}
            </article>
        </section>
    )
}