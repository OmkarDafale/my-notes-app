import React, { useState } from 'react';
import { MdOutlineColorLens, MdOutlinePhotoSizeSelectActual } from "./icons";
import './Options.css'

const colors = ['#ffffff', '#FAAFA8', '#AECCDC', '#FFF8B8', '#B4DDD3'];

const Options = ({ selectedColor, setSelectedColor, onImageUpload }) => {
    const [showColorOption, setShowColorOption] = useState(false);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64Img = reader.result;
            onImageUpload(base64Img);
        };
        reader.readAsDataURL(file);

        e.target.value = null;
    };
 
    return (
        <div className='option-container'>
            <div className='option-color'>
                <MdOutlineColorLens
                    size={24}
                    className='option-color-icon'
                    onClick={() => { setShowColorOption(!showColorOption) }}
                />
                {showColorOption && (
                    <div className='option-color-palette'>
                        {colors.map((color) => (
                            <div
                                key={color}
                                className={`${selectedColor === color ? 'border-gray-600' : 'border-transparent'}`}
                                onClick={() => {
                                    setSelectedColor(color);
                                    setShowColorOption(false);
                                }}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                )}
            </div>
            <label className='option-Image'>
                <MdOutlinePhotoSizeSelectActual size={24} />
                <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleImageChange}
                />
            </label>
        </div>
    );
};

export default Options;