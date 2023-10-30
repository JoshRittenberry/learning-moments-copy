import { useEffect, useState } from "react"
import "../create_post/CreatePost.css"
import { PostTopicDropdown } from "../PostTopicDropdown"
import { useNavigate, useParams } from "react-router-dom"
import { getPostById } from "../../../services/postService"
import { EditPostSaveBtn } from "./EditPostSaveBtn"

export const EditPost = ({ currentUser }) => {
    const [post, setPost] = useState({})
    const [postValues, setPostValues] = useState({
        userId: currentUser.id,
        topicId: 0,
        title: "",
        body: "",
        date: ""
    })

    const {postId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getPostById(postId).then(data => {
            const postObj = data[0]
            setPost(postObj)
        })
    }, [postId])

    useEffect(() => {
        const copy = {...postValues}
        copy.topicId = post.topicId
        copy.title = post.title
        copy.body = post.body
        copy.date = post.date
        setPostValues(copy)
    }, [post])

    return (
        <div className="new-post-container">
            {/* New Post Header */}
            <header className="new-post-header">
                <h1>Edit Post</h1>
            </header>

            {/* New Post Main Section */}
            <section className="new-post-main">

                {/* Input Form */}
                <form>
                    {/* New Post Top Inputs */}
                    <div className="post-creator-top">
                        {/* Title Input */}
                        <input
                            className="post-title"
                            type="text"
                            placeholder="Post Title"
                            required
                            value={postValues?.title}
                            onChange={(event) => {
                                const copy = { ...postValues }
                                copy.title = event.target.value
                                setPostValues(copy)
                            }}
                        />
                        {/* Topic Dropdown */}
                        <PostTopicDropdown setPostValues={setPostValues} postValues={postValues} />
                    </div>

                    {/* New Post Main Inputs */}
                    <div className="post-creator-middle">
                        {/* Body Textarea */}
                        <textarea
                            className="post-body"
                            type="text"
                            placeholder="Post Body"
                            required
                            value={postValues?.body}
                            onChange={(event) => {
                                const copy = { ...postValues }
                                copy.body = event.target.value
                                setPostValues(copy)
                            }}
                        />
                    </div>
                </form>


                {/* New Post Footer/Buttons */}
                <footer className="post-creator-bottom">
                    <EditPostSaveBtn postValues={postValues} setPostValues={setPostValues} postId={postId}/>
                    <button className="post-cancel-btn" onClick={() => {
                        navigate("/my_posts")
                    }}>Cancel</button>
                </footer>

            </section>
        </div>
    )
}