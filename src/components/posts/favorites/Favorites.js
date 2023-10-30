import "./Favorites.css"
import { useEffect, useState } from "react"
import { Post } from "../Post"
import { getAllUserPostLikes, getPostById } from "../../../services/postService"
import { PostFilter } from "../PostFilter"
import { PostSeach } from "../PostSearch"

export const Favorites = ({ currentUser }) => {
    const [postLikesArray, setPostLikesArray] = useState([])
    const [allLikedPosts, setAllLikedPosts] = useState([])
    const [showPosts, setShowPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        getAllUserPostLikes(currentUser.id).then(likesArray => {
            setPostLikesArray(likesArray)
        })
    }, [])

    useEffect(() => {
        const promises = postLikesArray.map(postLikeObj => getPostById(postLikeObj.postId));

        Promise.all(promises)
            .then(postArray => {
                // Since getPostById seems to return an array, we will flatten the result
                const flattenedArray = [].concat(...postArray);
                setAllLikedPosts(flattenedArray);
                setShowPosts(flattenedArray);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });

        // My Code:
        // const postArray = []
        // postLikesArray.map(postLikeObj => {
        //     getPostById(postLikeObj.postId).then(data => {
        //         postArray.push(data[0])
        //     })
        // })
        // setAllLikedPosts(postArray)
        // setShowPosts(postArray)
    }, [postLikesArray])

    useEffect(() => {
        const filterPostsBySearch = () => {
            const filteredPosts = showPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()))
            setShowPosts(filteredPosts)

            if (searchTerm === "") {
                setShowPosts(allLikedPosts)
            }
        }
        filterPostsBySearch()
    }, [searchTerm])

    const filterPostsByTopic = (topic) => {
        if (topic === "All Posts") {
            return setShowPosts(allLikedPosts)
        }
        const filteredPosts = allLikedPosts.filter(post => post.topic.name === topic)
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
                            <Post post={postObj} currentUserId={currentUser.id} setPostLikesArray={setPostLikesArray} />
                        </div>
                    )
                })}
            </article>
        </section>
    )
}