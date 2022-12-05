import React from 'react';
import cl from './CloseButton.module.css'

const CloseButton = ({onClick}) => {
    return (
        <div onClick={onClick} className={cl.main}>
            <div className={cl.left}>

            </div>
            <div className={cl.right}>

            </div>
        </div>
    );
};

export default CloseButton;