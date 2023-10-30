import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MyPostsOptions } from "./my_posts/MyPostsOptions"
import { getAllUserPostLikes, updatePostLikes } from "../../services/postService"

export const Post = ({ post, currentUserId, setPostLikesArray, userId }) => {

    const [isMyPost, setIsMyPost] = useState(false)
    const [postLikeStatus, setPostLikeStatus] = useState(false)
    const [isProfileView, setIsProfileView] = useState(false)

    useEffect(() => {
        if (post.userId === currentUserId) {
            setIsMyPost(!isMyPost)
        }
    }, [post, currentUserId])

    useEffect(() => {
        const postLikeObj = post.postLikes?.find(postLike => postLike.postId === post.id && postLike.userId === currentUserId)
        if (postLikeObj) {
            setPostLikeStatus(true)
        } else {
            setPostLikeStatus(false)
        }
    }, [post, currentUserId])

    useEffect(() => {
        if (userId) {
            setIsProfileView(true)
        }
    }, [userId])

    return (
        <div className="post-preview">
            {!isProfileView && (
                <Link to={`/user_profile/${post.userId}`}>
                    <img className="post-profile-preview" src={post.user.pictureUrl}></img>
                </Link>
            )}
            <div className="post-content">
                <div className="post-preview-header">
                    <div>
                        <Link to={`/view_post/${post.id}`}>
                            <h5>{post.title}</h5>
                        </Link>
                        {postLikeStatus && (
                            <button className="post-like-btn-main" onClick={() => {
                                updatePostLikes(post.id, currentUserId).then(() => {
                                    setPostLikeStatus(false)
                                    if (setPostLikesArray) {
                                        getAllUserPostLikes(currentUserId).then(likesArray => {
                                            setPostLikesArray(likesArray)
                                        })
                                    }
                                    console.log("this post is no longer liked")
                                })
                            }}>
                                <i className="fa-solid fa-heart"></i>
                            </button>
                        )}
                    </div>
                    {isMyPost && <MyPostsOptions post={post} />}
                </div>

                <h6>Topic: {post.topic.name}</h6>
                <h6>Date Posted: {post.date}</h6>
                <h6>Total Post Likes: {post.postLikes.length}</h6>
            </div>
        </div>
    )
}