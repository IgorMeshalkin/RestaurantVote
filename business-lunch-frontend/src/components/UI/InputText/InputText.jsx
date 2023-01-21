import React from 'react';
import cl from './InputText.module.css'

const InputText = React.forwardRef(({placeholder}, ref) => {
    return (
        <div className={cl.inputTextMain}>
            <input
                ref={ref}
                type={"text"}
                placeholder={placeholder}
                className={cl.input}
            />
        </div>
    );
});

export default InputText;