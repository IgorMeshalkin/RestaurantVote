import React from 'react';
import './PlusButton.css'

const PlusButton = ({onClick}) => {
    return (
        <div className="plusButton" onClick={onClick}>
            +
        </div>
    );
};

export default PlusButton;