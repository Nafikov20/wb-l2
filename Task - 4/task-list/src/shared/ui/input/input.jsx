import { useState } from 'react';

import cc from "classcat";

 import './custom-input.css'
// eslint-disable-next-line react/prop-types
export const Input = ({ label, onChange, value, type, required, className }) => {
    const [inputValue, setInputValue] = useState(value || '');

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange(newValue);
    };

    return (
        <div className={cc(['custom-input__container', className])}>
            <input
                className={cc(['custom-input', className])}
                required={required}
                type={type}
                value={inputValue}
                onChange={handleInputChange}
            />
            <label className={cc(['custom-input__label', className])}>{label}</label>
        </div>
    );
};