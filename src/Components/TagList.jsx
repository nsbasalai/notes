const TagList = ({ tags }) => {
    return tags ? tags.filter((item, index) => tags.indexOf(item) === index).map((tag, i) => <div key={i}>{tag}</div>) : <p>No tags</p>
}


export default TagList