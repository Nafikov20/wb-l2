import {useCallback, useEffect} from "react";

import {Icon} from "../icon/icon";

import './custom-modal.css'
// eslint-disable-next-line react/prop-types
export const Modal = ({visible = false, children, title = '', onClose,}) => {

    const escFunction = useCallback((event) => {
        if (event.key === "Escape") {
            onClose()
            //Do whatever when esc is pressed
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', escFunction);
        return ()=> document.removeEventListener('keydown', escFunction);
    }, [escFunction]);

    if (!visible) return null

    return (
        <div className='modal' onClick={onClose}>
            <div className='modal-dialog' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h3 className='modal-title'>{title}</h3>
                    <div className='modal-close' onClick={onClose}>
                        <Icon className='modal-close__icon' name='common/cross-bold'/>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
};
