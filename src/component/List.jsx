import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, togglePin, updateNote } from '../Store/Slice/noteSlice';
import Modal from './Modal';
import ListItem from './ListItem';
import './List.css'

const List = ({ notes }) => {
    const dispatch = useDispatch();
    const [selectedNote, setSelectedNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#ffffff');
    
    const handleDelete = (id) => {
        dispatch(deleteNote(id));
    };

    const handlePin = (id) => {
        dispatch(togglePin(id));
    };

    const handleModalOpen = (note) => {
        setSelectedNote(note);
        setSelectedColor(note.color);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedNote(null);
    };

    const handleUpdateNote = (updatedNote) => {
        dispatch(updateNote({ ...updatedNote }));
        setIsModalOpen(false);
    };

    // Seperate the pin notes & remaning notes
    const pinNotes = notes.filter((note) => note.pin);
    const otherNotes = notes.filter((note) => !note.pin);
    return (
        <div className='pin-container '>
            {pinNotes.length ? (
                <div className='pin-items'>
                    <h1 className='section-heading'>PINNED</h1>
                    <ListItem noteItems={pinNotes} handlePin={handlePin} handleDelete={handleDelete} handleModalOpen={handleModalOpen} />
                </div>
            ) : (
                ''
            )}
            {otherNotes.length ? (
                <div className='pin-items'>
                    <h1 className='section-heading'>OTHER</h1>
                    <ListItem noteItems={otherNotes} handlePin={handlePin} handleDelete={handleDelete} handleModalOpen={handleModalOpen} />
                </div>
            ) : (
                ''
            )}
            {!pinNotes.length && !otherNotes.length && (
                <div>
                    <h1 className='no-notes'>NO NOTES FOUND...</h1>
                </div>
            )}
            {isModalOpen && (
                <Modal note={selectedNote} onClose={handleModalClose} onUpdate={handleUpdateNote} />
            )}
        </div>
    );
};

export default List;
