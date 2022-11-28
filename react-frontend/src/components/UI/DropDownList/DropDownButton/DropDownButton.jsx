import React from 'react';
import './DropDownButton.css'

const DropDownButton = ({element, selectValueForSort, selectValueForDropDownList}) => {
    function selectThis() {
        selectValueForSort(element.value)
        selectValueForDropDownList(element)
    }

    return (
        <div className="DropDownButton" onClick={selectThis}>
            {element.title}
        </div>
    );
};

export default DropDownButton;