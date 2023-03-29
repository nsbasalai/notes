import { createSlice } from "@reduxjs/toolkit"

const noteList = []
export const regex = /(#+[a-zа-яА=ЯA-Z0-9A-Za-zÀ-ÖØ-öø-ʸ(_)]{1,})/g


const noteSlice = createSlice({
    name: 'notes',
    initialState: noteList,
    reducers: {
        addNote: (state, action) => {
            return [action.payload, ...state]
        },
        deleteNote: (state, action) => {
            return [...state.filter((e) => e.id !== action.payload)]
        },
        editNote: (state, action) => {
            let a = [...state.filter((e) => e.id === action.payload.id)]
            a[0].text = action.payload.newValue
            a[0].time = `edited ${action.payload.currentTime}`
            a[0].tags = action.payload.newValue.match(regex) ? action.payload.newValue.match(regex) : []
            if (a[0].tags.length) {
                a[0].tags = a[0].tags.filter((tag) => !action.payload.tagsBlacklist.includes(tag))
                return state
            }
            return state
        },
        editNoteTitle: (state, action) => {
            let a = [...state.filter((e) => e.id === action.payload.id)]
            a[0].title = action.payload.newTitle
            a[0].time = `edited ${action.payload.currentTime}`
            return state
        },
        filterTags: (state, action) => {
            return [...state.map((note) => ({ ...note, tags: note.tags.filter((tag) => tag !== action.payload) }))]
        }
    }
})

const tagsSlice = createSlice({
    name: 'tags',
    initialState: [],
    reducers: {
        setTagList: (state, action) => {
            console.log([...state, ...action.payload]
                .filter((item, index) => [...state, ...action.payload].indexOf(item) === index))
            return [...state, ...action.payload]
                .filter((item, index) => [...state, ...action.payload].indexOf(item) === index)
        },
        setRemoved: (state, action) => {
            return [...state, ...action.payload].filter((item) => !action.payload.includes(item))
        },
    }
})

const removedTagsSlice = createSlice({
    name: 'removedTags',
    initialState: [],
    reducers: {
        setTagsblacklist: (state, action) => {
            return [...state, ...action.payload]
                .filter((item, index) => [...state, ...action.payload].indexOf(item) === index)
        },
    }
})

export const { addNote, deleteNote, editNote, editNoteTitle, filterTags } = noteSlice.actions
export const notesReducer = noteSlice.reducer
export const { setRemoved, setTagList } = tagsSlice.actions
export const tagsReducer = tagsSlice.reducer
export const { setTagsblacklist } = removedTagsSlice.actions
export const removedTagsReducer = removedTagsSlice.reducer

