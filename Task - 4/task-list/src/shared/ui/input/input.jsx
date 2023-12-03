import { useState } from 'react';

import cc from "classcat";

 import './custom-input.css'
// eslint-disable-next-line react/prop-types
export const Input = ({ label, onChange, value, type, required, className, name }) => {
    const [inputDescriptionValue, setinputDescriptionValue] = useState(value || '');

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setinputDescriptionValue(newValue);
        onChange(newValue);
    };

    return (
        <div className={cc(['custom-input__container', className])}>
            <input
                className={cc(['custom-input', className])}
                name={name}
                required={required}
                type={type}
                value={inputDescriptionValue}
                onChange={handleInputChange}
            />
            <label className={cc(['custom-input__label', className])}>{label}</label>
        </div>
    );
};