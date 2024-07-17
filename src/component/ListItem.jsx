import React from 'react'
import { RiPushpin2Fill, RiPushpin2Line, MdDeleteOutline } from './icons';
import './ListItem.css'

const ListItem = ({ noteItems, handlePin, handleDelete, handleModalOpen }) => {
    return (
        <div className='list-container hover lg-col md-col'>
            {noteItems.map((note) => (
                <div key={note.id} className='note-item shadow-box' style={{ backgroundColor: note.color }} onClick={() => handleModalOpen(note)}>
                    <div className='pin-icon icon hover' onClick={(e) => { e.stopPropagation(); handlePin(note.id); }}>
                        {note.pin ? <RiPushpin2Fill size={20} /> : <RiPushpin2Line size={20} />}
                    </div>
                    {note.image &&
                        <img src={note.image} className='note-image' />
                    }
                    <h1 className='note-title'>{note.title}</h1>
                    <p className='note-content'>{note.note}</p>
                    <div className='delete-icon icon'>
                        <MdDeleteOutline size={20} className='cursor-pointer text-[#9CA3AF] hover:text-gray-800' onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListItem