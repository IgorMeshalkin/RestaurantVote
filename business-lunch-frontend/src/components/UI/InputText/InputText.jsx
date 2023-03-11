import React, {useEffect, useState} from 'react';
import cl from './InputText.module.css'

const InputText = React.forwardRef(({placeholder, value, onChange}, ref) => {
    const[innerValue, setInnerValue] = useState(value ? value : '')

    function changeValue(event) {
        setInnerValue(event)
        {
            onChange && onChange()
        }
    }

    return (
        <div className={cl.inputTextMain}>
            <input
                ref={ref}
                type={"text"}
                placeholder={placeholder}
                className={cl.input}
                value={innerValue}
                onChange={event => changeValue(event.target.value)}
            />
        </div>
    );
});

export default InputText;