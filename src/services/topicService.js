export const getPostTopics = () => {
    return fetch(`https://learning-moments-api.onrender.com/topics`).then(res => res.json())
}