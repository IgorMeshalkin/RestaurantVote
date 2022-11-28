import React, {useEffect, useRef, useState} from 'react';
import './SearchLine.css'
import Magnifier from "../../UI/Magnifier/Magnifier";

const SearchLine = ({getValueForFilter}) => {
    const inputRef = useRef(null);
    const[query, setQuery] = useState('')

    function changeQuery() {
        setQuery(inputRef.current.value)
    }

    function sendQuery() {
        getValueForFilter(query)
    }

    return (
        <div className="externalSearchLine">
            <div className="innerSearchLine">
                <input
                    ref={inputRef}
                    className="entryQuery"
                    type="text"
                    placeholder="Введите запрос..."
                    onChange={changeQuery}
                />
            </div>
            <div className="magnifierBlock">
                <Magnifier
                onClick={sendQuery}
                />
            </div>
        </div>
    );
};

export default SearchLine;