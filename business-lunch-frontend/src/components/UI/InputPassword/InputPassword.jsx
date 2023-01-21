import React, {useEffect, useRef, useState} from 'react';
import cl from "./InputPassword.module.css";
import Eye from "./Eye/Eye";

const InputPassword = ({placeholder, inputRef}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false)

    function setInputStatus() {
        if (isPasswordVisible) {
            inputRef.current.setAttribute('type', 'password')
        } else {
            inputRef.current.setAttribute('type', 'text')
        }
        setPasswordVisible(!isPasswordVisible)
    }

    return (
        <div className={cl.inputPasswordMain}>
            <input
                ref={inputRef}
                type={"password"}
                placeholder={placeholder}
                className={cl.input}
            />
            <div className={cl.eyeContainer} onClick={setInputStatus}>
                <Eye
                    isPasswordVisible={isPasswordVisible}
                />
            </div>
        </div>
    );
};

export default InputPassword;