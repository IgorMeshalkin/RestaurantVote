import React, {useEffect, useRef, useState} from 'react';
import './SmallDropDownList.css'
import SmallDropDownButton from "./SmallDropDownButton";

const SmallDropDownList = ({list , selectItem}) => {
    const dropDownRef = useRef();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false)
    }, [list])

    useEffect(() => {
        if (isOpen) {
            dropDownRef.current.setAttribute("style", "height:" + (list.length * 27) + "px; z-index: 9999998;")
        } else {
            dropDownRef.current.setAttribute("style", "height:26px;")
        }
    }, [isOpen])

    return (
        <div className="sddlMain">
            <div className={isOpen ? "sddlDropDownPart active" : "sddlDropDownPart"} ref={dropDownRef}>
                {
                    list.map(cuisine =>
                        <SmallDropDownButton
                            key={cuisine.id}
                            value={cuisine}
                            onClick = {selectItem}
                        />
                    )
                }
            </div>
            <div className="sddlArrowPart">
                <div className={isOpen ? "sddlArrowContainer" : "sddlArrowContainer down"} onClick={() => setIsOpen(!isOpen)}>
                    <div className="sddlArrow"/>
                </div>
            </div>
        </div>
    );
};

export default SmallDropDownList;