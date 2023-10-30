import { useEffect } from "react"
import { updatePostLikes } from "../../services/postService"
import { useNavigate } from "react-router-dom"

export const PostLikeButton = ({ postId, postLikes, userId, setPostLikeStatus, postLikeStatus }) => {

    const navigate = useNavigate()

    useEffect(() => {
        // Looks to find if there is a postLike that is owned by the current user
        const postLikeObj = postLikes?.find(postLike => postLike.postId === postId && postLike.userId === userId)

        if (postLikeObj) {
            setPostLikeStatus(true)
        } else {
            setPostLikeStatus(false)
        }
    }, [postId, postLikes])

    return (
        <>
            {/* If the post is liked already by the current user */}
            {postLikeStatus && (
                <button className="pst-like-btn" onClick={() => {
                    updatePostLikes(postId, userId).then(() => {
                        setPostLikeStatus(false)
                        console.log("this post is no longer liked")
                    })
                }}>
                    <i className="fa-solid fa-heart"></i>
                </button>
            )}

            {/* If the post is not liked by the current user */}
            {!postLikeStatus && (
                <button className="pst-like-btn" onClick={() => {
                    updatePostLikes(postId, userId).then(() => {
                        setPostLikeStatus(true)
                        console.log("this post is now liked")
                        navigate("/favorites")
                    })
                }}>
                    <i className="fa-regular fa-heart"></i>
                </button>
            )}
        </>
    )
}