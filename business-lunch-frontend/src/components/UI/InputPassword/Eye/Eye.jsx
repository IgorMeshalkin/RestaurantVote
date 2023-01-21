import React from 'react';
import './Eye.css'

const Eye = ({isPasswordVisible}) => {
    return (
        <div className="eyeMain">
            <div className="eyeOutBorder">
                <div className="eyeInnerBorder"/>
            </div>
            {
                isPasswordVisible && <div className="eyeLine"/>
            }
        </div>
    );
};

export default Eye;