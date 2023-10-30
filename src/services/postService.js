export const getAllPosts = () => {
    return fetch("https://learning-moments-api.onrender.com/posts?&_embed=postLikes&_embed=comments&_expand=user&_expand=topic").then(res => res.json())
}

export const getAllUserPosts = (id) => {
    return fetch(`https://learning-moments-api.onrender.com/posts?userId=${id}&_embed=postLikes&_embed=comments&_expand=user&_expand=topic`).then(res => res.json())
}

export const getAllUserPostLikes = (id) => {
    return fetch(`https://learning-moments-api.onrender.com/postLikes?userId=${id}`).then(res => res.json())
}

export const getPostById = (id) => {
    return fetch(`https://learning-moments-api.onrender.com/posts?id=${id}&_embed=postLikes&_embed=comments&_expand=user&_expand=topic`).then(res => res.json())
}

export const getAllPostLikes = () => {
    return fetch(`https://learning-moments-api.onrender.com/postLikes`).then(res => res.json())
}

export const getPostLikesByPostId = (postId) => {
    return fetch(`https://learning-moments-api.onrender.com/postLikes?postId=${postId}`).then(res => res.json())
}

// My Code
// export const updatePostLikes = (postId, userId) => {

//     getAllPostLikes().then(data => {
//         const allPostLikes = data

//         // Finds a commentLike object that matches the commentId and userId, if it doesn't find one it is null
//         const currentPostLike = allPostLikes?.find(postLike => postLike.userId === userId && postLike.postId === postId)

//         // If currentCommentLike is an object, delete that object
//         if (currentPostLike) {
//             return fetch(`https://learning-moments-api.onrender.com/postLikes/${currentPostLike.id}`, {
//                 method: "DELETE",
//             }).then(() => {
//                 console.log(`postLike #${currentPostLike.id} Removed`)
//             })
//         }

//         // If currentCommentLike is null, create an object for it
//         else {
//             const postLike = {
//                 "userId": userId,
//                 "postId": postId
//             }

//             return fetch(`https://learning-moments-api.onrender.com/postLikes`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(postLike),
//             }).then(() => {
//                 console.log(`postLike Added`)
//             })
//         }
//     })
// }

export const updatePostLikes = (postId, userId) => {
    return getAllPostLikes().then(data => { // Ensure this promise is returned
        const allPostLikes = data
        const currentPostLike = allPostLikes?.find(postLike => postLike.userId === userId && postLike.postId === postId)

        if (currentPostLike) {
            return fetch(`https://learning-moments-api.onrender.com/postLikes/${currentPostLike.id}`, {
                method: "DELETE",
            }).then(() => {
                console.log(`postLike #${currentPostLike.id} Removed`);
            })
        } else {
            const postLike = {
                "userId": userId,
                "postId": postId
            }

            return fetch(`https://learning-moments-api.onrender.com/postLikes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postLike),
            }).then(() => {
                console.log(`postLike Added`)
            })
        }
    })
}


export const createNewPost = (postObj) => {
    return fetch(`https://learning-moments-api.onrender.com/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postObj),
        }).then(() => {
            console.log(`post Added`)
    })
}

export const editPost = (postObj, postId) => {
    return fetch(`https://learning-moments-api.onrender.com/posts/${postId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            topicId: postObj.topicId,
            title: postObj.title,
            body: postObj.body,
        }),
    }).then(() => {
        console.log(`post #${postId} Updated`)
    })
}

export const deletePost = (postId) => {
    return fetch(`https://learning-moments-api.onrender.com/posts/${postId}`, {
        method: "DELETE",
    }).then(() => {
        console.log(`post #${postId} Deleted`)
    })
}

export const deletePostLike = (postLikeId) => {
    return fetch(`https://learning-moments-api.onrender.com/postLikes/${postLikeId}`, {
        method: "DELETE",
    }).then(() => {
        console.log(`postLike #${postLikeId} Deleted`)
    })
}