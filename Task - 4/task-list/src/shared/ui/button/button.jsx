import сс from "classcat";

import './custom-button.css'
// eslint-disable-next-line react/prop-types
export const Button = ({children, onClick, isDisabled, className}) => (
        <button
            disabled={isDisabled}
            className={сс(['custom-button', className], {
                'custom-button__disabled': isDisabled,
            })}
            onClick={onClick}
        >
            <span>{children}</span>
        </button>
    );