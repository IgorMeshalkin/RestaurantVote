import React from 'react';
import './SmallDropDownList.css'

const SmallDropDownButton = ({value, onClick}) => {

    function selectCurrentItem() {
        onClick(value)
    }

    return (
        <div className="sddlButtonMain" onClick={selectCurrentItem}>
            <div className="sddlButton">
                <span className="sddlButtonText">{value.title}</span>
            </div>
        </div>

    );
};

export default SmallDropDownButton;