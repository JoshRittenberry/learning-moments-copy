export const PostSeach = ({ setSearchTerm, searchTerm }) => {
    return (
        <div className="post-search-bar">
            <input 
                type="text"
                placeholder="Search Posts"
                className="post-search"
                value={searchTerm}
                onChange={(event) => {
                    setSearchTerm(event.target.value)
                }}
            />
        </div>
    )
}