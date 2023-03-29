import { useDispatch, useSelector } from "react-redux"
import ClearIcon from '@mui/icons-material/Clear'
import { ListItem } from "@mui/material"
import ListItemText from '@mui/material/ListItemText'
import { deleteNote, setRemoved } from "../../slices/slices"
import * as React from 'react'
import { Link } from "react-router-dom"


const Notes = ({ notes }) => {

    const dispatch = useDispatch()

    const removeNoteHandler = (id) => {
        dispatch(deleteNote(id))
        dispatch(setRemoved())
    }

    return (
        <ul className='notes__list'>
            {notes?.map((elem, id) =>
                <ListItem key={id} className='notes__li-item' style={{ padding: '0' }}>
                    <Link className='notes__link' to={`${id}`}>
                        <ClearIcon className='notes__remove-button' onClick={() => removeNoteHandler(elem.id)}>
                        </ClearIcon>
                        <ListItemText
                            primary={elem.title.length < 23 ? elem.title : `${elem.title.substring(0, 20)}...`}
                            secondary={
                                <React.Fragment>
                                    {elem.text.length < 53 ? elem.text : `${elem.text.substring(0, 50)}...`}
                                </React.Fragment>
                            }
                        />
                    </Link>
                </ListItem>
            )
            }
        </ul >
    )
}

export default Notes