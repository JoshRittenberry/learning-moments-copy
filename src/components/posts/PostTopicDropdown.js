import { useEffect, useState } from "react"
import { getPostTopics } from "../../services/topicService"

export const PostTopicDropdown = ({ setPostValues, postValues }) => {
    const [topics, setTopics] = useState([])
    const [topicSelectionText, setTopicSelectionText] = useState("Post Topic")

    useEffect(() => {
        getPostTopics().then(data => {
            const topicsArray = data
            setTopics(topicsArray)
        })
    }, [])

    useEffect(() => {
        if (postValues.topicId != 0) {
            getPostTopics().then(data => {
                const topicsArray = data
                const currentTopic = topicsArray.find(topic => topic.id === postValues.topicId)
                setTopicSelectionText(currentTopic?.name)
            })
        }
    }, [postValues])

    return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {topicSelectionText}
                </button>
                <ul className="dropdown-menu">
                    {topics?.map(topicObj => {
                        return (
                            <li key={topicObj.id}>
                                <a className="dropdown-item" href="#" onClick={() => {
                                    const copy = {...postValues}
                                    copy.topicId = topicObj.id
                                    setPostValues(copy)
                                }}>
                                    {topicObj.name}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
    )
}