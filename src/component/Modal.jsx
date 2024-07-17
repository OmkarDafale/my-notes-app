import React, { useState, useEffect } from 'react';
import Options from './Options';
import { MdDeleteOutline } from 'react-icons/md';
import './Modal.css'

const Modal = ({ note, onClose, onUpdate }) => {
    const [editedNote, setEditedNote] = useState({ ...note });
    const [selectedColor, setSelectedColor] = useState(note.color);
    const [image, setImage] = useState(editedNote.image);
    useEffect(() => {
        setEditedNote(prev => ({ ...prev, color: selectedColor }));
    }, [selectedColor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedNote(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (image) {
            editedNote.image = image
        }
        onUpdate(editedNote);
    };

    const deleteImage = () => {
        setImage('')
        setEditedNote(prev => ({ ...prev, image: '' }))
    }


    return (
        <div className='main-modal'>
            <div className='modal-container' style={{ backgroundColor: selectedColor }}>
                <h2 className='modal-title'>Edit Note</h2>
                {
                    image &&
                    <div className='modal-img-container'>
                        <img src={image}/>
                        <div onClick={deleteImage}>
                            <MdDeleteOutline />
                        </div>
                    </div>
                }
                <input
                    type='text'
                    name='title'
                    value={editedNote.title}
                    onChange={handleChange}
                    className='modal-input'
                    placeholder='Title'
                />
                <textarea
                    name='note'
                    value={editedNote.note}
                    onChange={handleChange}
                    className='modal-input'
                    placeholder='Note'
                    rows='3'
                />
                <div className='modal-btn-container'>
                    <Options selectedColor={selectedColor} setSelectedColor={setSelectedColor} onImageUpload={setImage} />
                    <div className='modal-options'>
                        <button onClick={onClose} className='btn cancel'>Cancel</button>
                        <button onClick={handleSubmit} className='btn save'>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;  
