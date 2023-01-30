import React, {useState} from 'react';
import cl from './InputTime.module.css'

const InputTime = ({inputRef, value, onChange}) => {
    // const [innerValue, setInnerValue] = useState(value)

    return (
        <div className={cl.inputTimeMain}>
            <input
                ref={inputRef}
                type={"time"}
                className={cl.inputTime}
                value={value}
                onChange={event => onChange(event.target.value)}
            />
        </div>
    );
};

export default InputTime;