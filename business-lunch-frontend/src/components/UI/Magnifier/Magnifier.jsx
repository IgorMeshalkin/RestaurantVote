import React from 'react';
import './Magnifier.css'

const Magnifier = ({onClick}) => {
    function clickMagnifier() {
        onClick()
    }

    return (
        <div className="magnifierMain" onClick={clickMagnifier}>
            <div className="magnifier"/>
            <div className="handle"/>
        </div>
    );
};

export default Magnifier;