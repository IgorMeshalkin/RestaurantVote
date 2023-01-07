import React from 'react';
import './BigCloseButton.css'

const BigCloseButton = ({onClick}) => {
    return (
        <div className="bigCloseButtonMain" onClick={() => onClick()}>
            <div className="bigCloseButtonBackground"/>
            <div className="bigCloseButtonFirstElement"/>
            <div className="bigCloseButtonSecondElement"/>
        </div>
    );
};

export default BigCloseButton;