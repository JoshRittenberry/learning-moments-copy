import { useState } from "react"

export const PostFilter = ({ filterPostsByTopic }) => {
    const [filterText, setFilterText] = useState("All Posts")

    return (
        <>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {filterText}
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => {
                            setFilterText("All Posts")
                            filterPostsByTopic("All Posts")
                        }}>
                            All Posts
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => {
                            setFilterText("CSS")
                            filterPostsByTopic("CSS")
                        }}>
                            CSS
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => {
                            setFilterText("HTML")
                            filterPostsByTopic("HTML")
                        }}>
                            HTML
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => {
                            setFilterText("JavaScript")
                            filterPostsByTopic("JavaScript")
                        }}>
                            JavaScript
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => {
                            setFilterText("React")
                            filterPostsByTopic("React")
                        }}>
                            React
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => {
                            setFilterText("General Chat")
                            filterPostsByTopic("General Chat")
                        }}>
                            General Chat
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => {
                            setFilterText("Funny Moments")
                            filterPostsByTopic("Funny Moments")
                        }}>
                            Funny Moments
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}