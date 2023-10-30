import "./AllPosts.css"
import { useEffect, useState } from "react"
import { Post } from "../Post"
import { getAllPosts } from "../../../services/postService"
import { PostFilter } from "../PostFilter"
import { PostSeach } from "../PostSearch"

export const AllPosts = ({ currentUser }) => {
    const [allPosts, setAllPosts] = useState([])
    const [showPosts, setShowPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = () => {
        getAllPosts().then(postArray => {
            setAllPosts(postArray)
            setShowPosts(postArray)
        })
    }

    useEffect(() => {
        const filterPostsBySearch = () => {
            const filteredPosts = showPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()))
            setShowPosts(filteredPosts)

            if (searchTerm === "") {
                setShowPosts(allPosts)
            }
        }
        filterPostsBySearch()
    }, [searchTerm])

    const filterPostsByTopic = (topic) => {
        if (topic === "All Posts") {
            return setShowPosts(allPosts)
        }
        const filteredPosts = allPosts.filter(post => post.topic.name === topic)
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
                    return <Post post={postObj} currentUserId={currentUser.id} key={postObj.id} />
                })}
            </article>
        </section>
    )
}