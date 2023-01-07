import React from 'react';
import './BigArrow.css'

const BigArrow = ({direction, onClick}) => {
    return (
        <div className="bigArrowMain" onClick={() => onClick(direction)}>
            <div className="bigArrowBackground"/>
            <div className={direction === "left" ? "bigArrowTopElement leftDirection" : "bigArrowTopElement rightDirection"}/>
            <div className={direction === "left" ? "bigArrowBottomElement leftDirection" : "bigArrowBottomElement rightDirection"}/>
        </div>
    );
};

export default BigArrow;