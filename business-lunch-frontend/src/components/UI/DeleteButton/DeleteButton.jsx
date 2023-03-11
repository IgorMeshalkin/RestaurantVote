import React, {useContext} from 'react';
import './DeleteButton.css'

const DeleteButton = ({onClick}) => {
    return (
        <div className="delButMain" title="Удалить" onClick={onClick}>
            <div className="basketBody">
                <div className="basketLid"/>
                <div className="basketLidHandle"/>
                <div className="basketEdge"/>
            </div>
        </div>
    );
};

export default DeleteButton;