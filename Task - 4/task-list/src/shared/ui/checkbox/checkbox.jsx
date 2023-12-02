import cc from "classcat";

import {Icon} from "../icon/icon";

import './custom-checkbox.css'

// eslint-disable-next-line react/prop-types
export const Checkbox = ({className, id, label, value, isChecked, onChange}) => (

        <label htmlFor={id} className={cc([
            {'Checkbox__active': isChecked}, 'Checkbox', className
            ])}>
            <span className='Checkbox-Inner'>
                <Icon className='Checkbox-Icon' name='toast/check'/>
                <input
                    checked={isChecked}
                    className='Checkbox-Input'
                    name={label}
                    type="checkbox"
                    value={label}
                    onChange={onChange}
                />
            </span>
            {value && <span className="Checkbox-Label">{value}</span>}
        </label>
    )