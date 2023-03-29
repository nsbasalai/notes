import './App.css'
import * as React from 'react'
import Box from '@mui/material/Box'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom"
import Notelist from './Components/Notelist/Notelist'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import styles from './css/style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import { filterTags, regex, setRemoved, setTagList, setTagsblacklist } from './slices/slices'

const theme = createTheme({
  palette: {
    primary: {
      main: '#353535'
    },
    secondary: {
      main: '#fefefe'
    }
  }
})

const App = () => {

  const noteList = useSelector(state => state.notes)
  const [tags, setTags] = useState([])
  const [removedTags, setRemovedTags] = useState([])
  const [newTag, setNewTag] = useState('')
  const dispatch = useDispatch()

  const setTagsHandler = () => {
    noteList.forEach((note) => {
      if (note.tags.length) {
        setTags((prev) => ([...prev, ...note.tags]))
      } else {
        setTags((prev) => [...prev])
      }
    })
  }

  const addTagButton = () => {
    return (
      <div className='notelist__addtag-wrp'>
        <input className='notelist__addtag-input' placeholder='tag should start with #' value={newTag} onChange={(e) => setNewTag(e.target.value)}></input>
        <button className='notelist__addtag-button' onClick={addTagHandler}>add</button>
      </div>
    )
  }

  const removeTagButton = (tag) => {
    return <button className='notelist__removetag-button' onClick={() => removeTagHandler(tag)}>x</button>
  }

  const addTagHandler = () => {
    document.querySelector('.notelist__addtag-input').style.border = '1px solid black'
    if (newTag && newTag.match(regex)) {
      setTags((prev) => [...prev, newTag])
      setNewTag('')
    } else {
      console.log('1')
      document.querySelector('.notelist__addtag-input').style.border = '1px solid #ff3333'
    }
  }

  const removeTagHandler = (tag) => {
    setTags(tags.filter((item) => item !== tag))
    setRemovedTags((prev) => [...prev, tag])
    dispatch(filterTags(tag))
  }

  useEffect(() => {
    dispatch(setRemoved(removedTags))
    dispatch(setTagsblacklist(removedTags))
  }, [removedTags])

  useEffect(() => {
    dispatch(setTagList(tags))
  }, [tags])

  useEffect(() => {
    setTagsHandler()
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box className='header'>
          <nav aria-label="secondary mailbox folders">
            <Link to='/' style={{ textDecoration: 'none', width: '100%' }}>
              <ListItemButton onClick={setTagsHandler}>
                <ListItemText style={{ color: '#fff' }} primary="All notes" />
              </ListItemButton>
            </Link>
          </nav>
        </Box>
        <Routes>
          <Route path='/' element={<Notelist
            addTagButton={addTagButton}
            removeTagButton={removeTagButton} />}>
            <Route path=':noteId' element={<Notelist />} />
          </Route>
          <Route path='*' element={<div>404 not found</div>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
