import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

// Initial notes data
const initialNotes = [
    {
        id: uuidv4(),
        title: 'First Note',
        note: 'Just testing',
        color: '#fff',
        pin: false,
        img: ''
    },
    {
        id: uuidv4(),
        title: 'Second Note',
        note: 'Just testing',
        color: '#fff',
        pin: false,
        img: ''
    }
];

// Initialize state with notes from localStorage or initialNotes if empty
const initialState = {
    notes: JSON.parse(localStorage.getItem('notes')) || initialNotes,
};

const noteSlice = createSlice({
    name: 'noteSlice',
    initialState,
    reducers: {
        // Get all notes
        getAllNotes: (state) => state.notes,

        // Add a note
        addNote: (state, action) => {
            state.notes.push(action.payload);
            localStorage.setItem('notes', JSON.stringify(state.notes));
            toast.success('Note added successfully')
        },

        // Update a note
        updateNote: (state, action) => {
            const { id, title, note, color, image } = action.payload;
            const existingNote = state.notes.find(note => note.id === id);
            if (existingNote) {
                existingNote.title = title;
                existingNote.note = note;
                existingNote.color = color;
                existingNote.image = image;
                localStorage.setItem('notes', JSON.stringify(state.notes));
            }
            toast.success('Note updated successfully')
        },

        // Delete a note
        deleteNote: (state, action) => {
            const id = action.payload;
            state.notes = state.notes.filter(note => note.id !== id);
            localStorage.setItem('notes', JSON.stringify(state.notes));
            toast.error('Note deleted successfully')
        },

        // Toggle pin a note
        togglePin: (state, action) => {
            const id = action.payload;
            state.notes = state.notes.map((note) => {
                if (note.id === id) {
                    !note.pin ? toast.success('Note pinned successfully') : toast.error('Note unpinned successfully')
                    return { ...note, pin: !note.pin };
                }
                return note;
            });
            localStorage.setItem('notes', JSON.stringify(state.notes));
        }
    }
});

export const { getAllNotes, addNote, updateNote, deleteNote, togglePin } = noteSlice.actions;
export default noteSlice.reducer;
