
import cc from "classcat";

import './custom-button.css'
// eslint-disable-next-line react/prop-types
export const Button = ({children, onClick, isDisabled, className, typeButton}) => (
        <button
            disabled={isDisabled}
            type={typeButton}
            className={cc([
                {'custom-button__disabled': isDisabled}, 'custom-button', className
            ])}
            onClick={onClick}
        >
            <span>{children}</span>
        </button>
    );