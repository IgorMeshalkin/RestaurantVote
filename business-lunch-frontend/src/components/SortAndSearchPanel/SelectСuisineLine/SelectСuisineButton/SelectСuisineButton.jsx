import React from 'react';
import './SelectСuisineButton.css'

const SelectCuisineButton = (props) => {
    function selectThisCuisine() {
        props.selectСuisine(props.children.value)
        props.setCurrentCuisine(props.children.value)
    }

    return (
        <div className={props.currentCuisine === props.children.value ? "selectedCuisineButton" : "selectCuisineButton"} onClick={selectThisCuisine}>
            {props.children.title}
        </div>
    );
};

export default SelectCuisineButton;