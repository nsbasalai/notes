import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as React from 'react'
import Note from '../Note.jsx'
import { useDispatch, useSelector } from "react-redux"
import { addNote } from "../../slices/slices"
import Notes from "./Notes"

const NoteList = ({ addTagButton, removeTagButton, }) => {

    const [notes, setNotes] = useState([])
    const [filteredNotes, setFilteredNotes] = useState([])
    const [filterTag, setFilterTag] = useState('')
    const tags = useSelector(state => state.tags)
    const { noteId } = useParams()
    const noteList = useSelector(state => state.notes)
    const filterButtons = document.querySelectorAll('.notelist__button')
    let isFiltered = false
    const dispatch = useDispatch()
    const newNote = {
        title: 'New note',
        text: '',
        id: '',
        time: '',
        tags: [],
    }

    useEffect(() => {
        setNotes(noteList)
    }, [noteList])

    const maxId = (objectsArray) => Math.max(...objectsArray.map((e) => e.id))
    const addNoteHandler = () => {
        const date = new Date()
        const currentTime = date.toLocaleString()
        dispatch(addNote({ ...newNote, id: noteList.length ? maxId(noteList) + 1 : 0, time: currentTime }))
    }

    const resetStyle = () => {
        filterButtons.forEach((button) => {
            button.style.backgroundColor = 'transparent'
            button.style.color = '#353535'
        })
    }

    const filterNotes = (e) => {
        if (filterTag !== e.target.innerHTML) {
            setFilteredNotes([])
            resetStyle()
            e.target.style.backgroundColor = '#353535'
            e.target.style.color = '#ffffff'
            setFilterTag(e.target.innerHTML)
            setFilteredNotes(noteList.filter((note) => note.tags.includes(e.target.innerHTML)))
        } else {
            e.target.style.backgroundColor = 'transparent'
            e.target.style.color = '#353535'
            setFilterTag('')
            setFilteredNotes([])
        }

    }

    const render = () => {
        if (filteredNotes.length) {
            isFiltered = true
            return <Notes notes={filteredNotes} />
        } else {
            return <Notes notes={notes} />
        }
    }

    return (

        <div className='notelist'>
            <div className='notelist__notes notes'>
                {isFiltered ? null : <button className='notelist__add-note' onClick={addNoteHandler}>New note</button>}
                {render()}
            </div>
            {noteId && notes[noteId] ?
                <div style={{ width: '80%', height: '100vh', display: 'grid', gridTemplateRows: '8fr 2fr', margin: '0 30px 0 50px' }}>
                    {filteredNotes.length ?
                        <Note note={filteredNotes[noteId]} tagList={tags} />
                        :
                        <Note note={notes[noteId]} tagList={tags} />}
                </div>
                :
                tags ?
                    <div className='notelist__tags'>
                        {tags.filter((item, index) => tags.indexOf(item) === index)
                            .map((tag, i) =>
                                <div key={i}>
                                    <button className='notelist__tag-button' onClick={(e) => filterNotes(e)}>
                                        {tag}
                                    </button>
                                    {removeTagButton(tag)}
                                </div>)}
                        {addTagButton()}
                    </div> : <p>No tags</p>
            }
        </div>
    )
}


export default NoteList