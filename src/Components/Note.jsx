import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editNote, editNoteTitle } from "../slices/slices"
import HighlightWithinTextarea from "react-highlight-within-textarea"

const Note = ({ note, tagList }) => {

    const dispatch = useDispatch()
    const tagsBlacklist = useSelector(state => state.removedTags)
    const [task, setTask] = useState('')
    const [title, setTitle] = useState('')
    const [tags, settags] = useState([])

    useEffect(() => {
        setTitle(note.title)
        setTask(note.text)
        settags(note.tags)
    }, [note])

    const editNoteHandler = (e, id) => {
        let newValue = e
        if (newValue !== task) {
            console.log('here')
            setTask(newValue)
            const date = new Date()
            const currentTime = date.toLocaleString()
            dispatch(editNote({ id, newValue, currentTime, tagsBlacklist }))
        }
    }

    const editNoteTitleHandler = (e, id) => {
        let newTitle = e.target.value
        if (newTitle) {
            setTitle(newTitle)
            const date = new Date()
            const currentTime = date.toLocaleString()
            dispatch(editNoteTitle({ id, newTitle, currentTime }))
        } else dispatch(editNoteTitle({ id, newTitle: 'New note' }))
    }

    const render = () => {
        if (tags) {
            return <p>tags: {tags.join(' ')}</p>
        }
    }

    return (
        <div className='notes__item' >
            <p className='notes__time'>{note.time}</p>
            <textarea className='notes__title'
                type="text"
                name="task"
                placeholder="Write a task name"
                value={title === 'New note' ? '' : title}
                onChange={(e) => editNoteTitleHandler(e, note.id)}
            />
            <div className='notes__editor'>
                <HighlightWithinTextarea
                    type="text"
                    name="task"
                    value={task}
                    placeholder='Write a task'
                    highlight={tagList.map((tag) => tag.replace('#', ''))}
                    onChange={(e) => editNoteHandler(e, note.id)}
                />
            </div>
            {tags.length ? render(tags) : null}
        </div>
    )
}

export default Note