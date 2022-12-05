import React from 'react';
import button from "bootstrap/js/src/button";
import cl from './RegularButton.module.css'

const RegularButton = ({children, onClick}) => {
    return (
        <button className={cl.button} onClick={onClick}>
            {children}
        </button>
    );
};

export default RegularButton;