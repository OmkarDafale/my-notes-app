import React, { useRef, useState, useEffect } from 'react';
import { MdDeleteOutline, TiPinOutline, TiPin } from './icons';
import { useDispatch } from 'react-redux';
import { addNote } from '../Store/Slice/noteSlice';
import { v4 as uuidv4 } from 'uuid';
import Options from './Options';
import './InputForm.css';

const Input = () => {
  const [open, setOpen] = useState(false);
  const [pin, setPin] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const noteRef = useRef(null);

  const adjustTextareaHeight = (ref) => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const note = noteRef.current.value;

    if (!title && !note) {
      reset();
      return;
    }

    const id = uuidv4();
    const data = { id, title, note, color: selectedColor, pin, image };
    dispatch(addNote(data));
    reset();
  };

  const reset = () => {
    titleRef.current.value = '';
    titleRef.current.style = 'auto';
    noteRef.current.value = '';
    noteRef.current.style = 'auto'
    setOpen(false);
    setSelectedColor('#ffffff');
    setImage(null);
    setPin(false);
  };

  const handlePin = () => setPin(!pin);
  const deleteImage = () => {
    setImage(null);
  };

  return (
    <form
      onSubmit={submit}
      className='inputForm-container container-width'
      onClick={() => setOpen(true)}
      style={{ backgroundColor: selectedColor }}
    >
      {image && (
        <div className='inputForm-img-container'>
          <img src={image} alt='Selected' />
          <div onClick={deleteImage}>
            <MdDeleteOutline />
          </div>
        </div>
      )}
      {open && (
        <div className='inputForm-open'>
          <textarea
            placeholder='Title'
            ref={titleRef}
            onInput={() => adjustTextareaHeight(titleRef)}
            rows={1}
          />
          <button
            type='button'
            onClick={handlePin}
            aria-label='Pin note'
          >
            {pin ? <TiPin size={24} /> : <TiPinOutline size={24} />}
          </button>
        </div>
      )}
      <textarea
        className='inputForm-textarea'
        placeholder='Take a note...'
        ref={noteRef}
        onInput={() => adjustTextareaHeight(noteRef)}
        rows={open ? 3 : 1}
      />
      {open && (
        <div className='inputForm-options'>
          <Options selectedColor={selectedColor} setSelectedColor={setSelectedColor} onImageUpload={setImage} />
          <button type='submit'>
            Close
          </button>
        </div>
      )}
    </form>
  );
};

export default Input;
