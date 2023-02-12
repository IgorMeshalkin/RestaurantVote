import React, {useEffect, useRef, useState} from 'react';
import './SmallDropDownList.css'
import SmallDropDownButton from "./SmallDropDownButton";

const SmallDropDownList = ({list, selectItem}) => {
    const ddMainRef = useRef()
    const dropDownRef = useRef();

    const [isOpen, setIsOpen] = useState(false);

    //Закрывать выпадающий список при каждом скролле и при каждом клике вне вписка.
    useEffect(() => {
        window.addEventListener("scroll", () => setIsOpen(false));
        window.addEventListener('click', (e) => {
            if (!e.composedPath().includes(ddMainRef.current)) setIsOpen(false)
        });
        return () => {
            window.removeEventListener("scroll", () => setIsOpen(false));
            window.removeEventListener('click', (e) => {
                if (!e.composedPath().includes(ddMainRef.current)) setIsOpen(false)
            })
        }
    }, []);

    //Закрывать выпадающий список после выбора пункта.
    useEffect(() => {
        setIsOpen(false)
    }, [list])

    //Открытие-закрытие выпадающего списка.
    useEffect(() => {
        if (isOpen) {
            dropDownRef.current.setAttribute("style", "height:" + (list.length * 27) + "px;")
        } else {
            dropDownRef.current.setAttribute("style", "height:26px;")
        }
    }, [isOpen])

    return (
        <div className="sddlMain" ref={ddMainRef}>
            <div className={isOpen ? "sddlDropDownPart active" : "sddlDropDownPart"} ref={dropDownRef}>
                {
                    list.map(cuisine =>
                        <SmallDropDownButton
                            key={cuisine.id}
                            value={cuisine}
                            onClick={selectItem}
                        />
                    )
                }
            </div>
            <div className="sddlArrowPart">
                <div className={isOpen ? "sddlArrowContainer" : "sddlArrowContainer down"}
                     onClick={() => setIsOpen(!isOpen)}>
                    <div className="sddlArrow"/>
                </div>
            </div>
        </div>
    );
};

export default SmallDropDownList;