import React, {useEffect, useRef} from 'react';
import './DropDownList.css'
import DropDownButton from "./DropDownButton/DropDownButton";
import Arrow from "../Arrows/Arrow";

const DropDownList = (props) => {
    const dropDownRef = useRef()

    useEffect(() => {
        const dropDownHeight = (props.selectList.length * 41)
        if (props.dropDownListIsOpen) {
            dropDownRef.current.setAttribute('style', 'height:' + dropDownHeight + 'px;')
        } else {
            dropDownRef.current.setAttribute('style', 'height:' + 40 + 'px;')
        }
    }, [props.dropDownListIsOpen])

    function selectElement(element) {
        const newSelectList = props.selectList.map((elem) => {
            if (elem.id === element.id) {
                return {...elem, selected: true}
            } else {
                return {...elem, selected: false}
            }
        })
        props.setSelectList(sortSelectList(newSelectList))
        props.setDropDownListIsOpen(false)
    }

    function sortSelectList(list) {
        return [...list].sort((a) => {
            if (a.selected) {
                return -1
            } else {
                return 1
            }
        })
    }

    return (<div className="externalDropDownList">
        <div className="dropDownList" ref={dropDownRef}>
            <div>
                {props.selectList.map((elem) =>
                    <DropDownButton
                        key={elem.id}
                        element={elem}
                        selectValueForDropDownList={selectElement}
                        selectValueForSort={props.selectValueForSort}
                    />
                )}
            </div>
        </div>
        <div className="rightSide">
            <div className={props.dropDownListIsOpen ? "arrowHandle" : "arrowHandle close"}>
                <Arrow
                    onClick={() => props.setDropDownListIsOpen(!props.dropDownListIsOpen)}
                    direction='right'
                />
            </div>
        </div>
    </div>);
};

export default DropDownList;