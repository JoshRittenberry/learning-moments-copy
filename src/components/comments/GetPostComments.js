import { useEffect, useState } from "react"
import { getCommentById, getCommentLikesByCommentId, updateCommentLikes } from "../../services/commentService"

export const GetPostComments = ({ commentId, userId }) => {

    const [comment, setComment] = useState({})
    const [commentLikeStatus, setCommentLikeStatus] = useState(Boolean)
    const [postCommentLikes, setPostCommentLikes] = useState([])

    // Sets the current comment
    useEffect(() => {
        getCommentById(commentId).then(data => {
            const commentObj = data[0]
            setComment(commentObj)
        })
    }, [commentId])

    // Sets a boolean to tell if the current user has liked the current comment or not
    useEffect(() => {
        const liked = comment.commentLikes?.find(commentLike => commentLike.userId === userId)

        if (liked) {
            setCommentLikeStatus(true)
        } else {
            setCommentLikeStatus(false)
        }
    }, [comment])

    useEffect(() => {
        getCommentLikesByCommentId(comment.id).then(likesArray => {
            setPostCommentLikes(likesArray)
        })
    }, [commentLikeStatus])

    return (
        // Comment Container
        <div className="comment-container">

            {/* Comment Header */}
            <header className="comment-header">
                <div className="comment-creator">{comment.user?.firstName} {comment.user?.lastName}</div>
                <div className="comment-date">{comment.date}</div>
            </header>

            {/* Comment Body */}
            <section className="comment-main">
                <div className="comment-body">{comment.body}</div>
            </section>

            {/* Comment Footer */}
            <footer className="comment-footer">

                {/* If the comment is liked already by the current user */}
                {commentLikeStatus && (
                    <button className="comment-like-btn" onClick={() => {
                        updateCommentLikes(commentId, userId).then(() => {
                            setCommentLikeStatus(!commentLikeStatus)
                            console.log("this comment is no longer liked")
                        })
                    }}>
                        <i className="fa-solid fa-heart"></i>
                    </button>
                )}

                {/* If the comment is not liked already by the current user */}
                {!commentLikeStatus && (
                    <button className="comment-like-btn" onClick={() => {
                        updateCommentLikes(commentId, userId).then(() => {
                            setCommentLikeStatus(!commentLikeStatus)
                            console.log("this comment is now liked")
                        })
                    }}>
                        <i className="fa-regular fa-heart"></i>
                    </button>
                )}
                <div className="comment-like-count">
                    {postCommentLikes?.length} Total Comment Likes
                </div>
            </footer>

        </div>
    )
}