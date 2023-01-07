import React from 'react';
import cl from './UpButton.module.css'

const UpButton = ({action}) => {
    return (
        <div className={cl.main} onClick={action}>
            <div className={cl.arrow}/>
            <div className={cl.cover}/>
            <div className={cl.text}>Наверх</div>
        </div>
    );
};

export default UpButton;
