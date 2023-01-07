import React, {useEffect, useRef, useState} from 'react';
import './SelectСuisineLine.css'
import Arrow from "../../UI/Arrows/Arrow";
import SelectCuisineButton from "./SelectСuisineButton/SelectСuisineButton";
import {usePressingButton} from "../../../hooks/usePressingButton";

const SelectCuisineLine = ({cuisines, setCuisines, selectСuisine}) => {
    const lineRef = useRef()
    const innerLineVisorRef = useRef()
    const rightArrow = useRef()
    const leftArrow = useRef()
    const leftRedSignal = useRef()
    const rightRedSignal = useRef()

    const [linePosition, setLinePosition] = useState(0)
    const [limitPositions, setLimitPositions] = useState({left: true, right: false})
    const [lineLength, setLineLength] = useState(0)
    const [step, setStep] = useState(0)
    const [currentCuisine, setCurrentCuisine] = useState('ALL')

    const isLeftArrowPressing = usePressingButton(leftArrow)
    const isRightArrowPressing = usePressingButton(rightArrow)

    useEffect(() => {
        setLineLength(cuisines.length * 130)
        setStep(Math.floor(getLineVisorWidth() / 130) * 130)
    }, [])

    useEffect(() => {
        if (isRightArrowPressing && limitPositions.right) {
            lineRef.current.setAttribute('style', 'left:' + (linePosition - 10) + 'px')
            rightRedSignal.current.setAttribute('style', 'box-shadow: 0 0 8px 2px red;')
        } else if (!isRightArrowPressing) {
            rightRedSignal.current.setAttribute('style', 'box-shadow: none;')
        }

        if (isLeftArrowPressing && limitPositions.left) {
            lineRef.current.setAttribute('style', 'left:' + (linePosition + 10) + 'px')
            leftRedSignal.current.setAttribute('style', 'box-shadow: 0 0 8px 2px red;')
        } else if (!isLeftArrowPressing) {
            leftRedSignal.current.setAttribute('style', 'box-shadow: none;')
        }
    }, [isLeftArrowPressing, isRightArrowPressing])

    function getLineVisorWidth() {
        return parseInt(window.getComputedStyle(innerLineVisorRef.current).width.replace('px', ''), 10)
    }

    function leftMotion() {
        setLimitPositions({...limitPositions, right: false})

        if (linePosition + step > 0) {
            lineRef.current.setAttribute('style', 'left: 0')
            setLinePosition(0)
            setLimitPositions({...limitPositions, left: true})
            return
        }

        lineRef.current.setAttribute('style', 'left:' + (linePosition + step) + 'px')
        setLinePosition(linePosition + step)

        if (limitPositions.left && isLeftArrowPressing) {
            lineRef.current.setAttribute('style', 'left:' + (linePosition + 10) + 'px')
        }
    }

    function rightMotion() {
        setLimitPositions({...limitPositions, left: false})

        lineRef.current.setAttribute('style', 'left:' + (linePosition - step) + 'px')
        setLinePosition(linePosition - step)

        const lineVisorWidth = getLineVisorWidth()
        if (lineVisorWidth > (lineLength - (Math.abs(linePosition))) - lineVisorWidth) {
            const limitRightPosition = lineLength - lineVisorWidth
            lineRef.current.setAttribute('style', 'left:' + (-limitRightPosition) + 'px')
            setLinePosition(-limitRightPosition)
            setLimitPositions({...limitPositions, right: true})
        }
    }

    return (
        <div className="externalLineVisor">
            <div style={{margin: "3px", float: "left"}}>
                <Arrow
                    direction='left'
                    onClick={leftMotion}
                    ref={leftArrow}
                />
            </div>
            <div className="innerLineVisor" ref={innerLineVisorRef}>
                <div className="cuisineLine" ref={lineRef}>
                    {cuisines.map(cuisine =>
                        <SelectCuisineButton
                            key={cuisine.id}
                            selectСuisine={selectСuisine}
                            currentCuisine={currentCuisine}
                            setCurrentCuisine={setCurrentCuisine}
                        >
                            {cuisine}
                        </SelectCuisineButton>
                    )}
                </div>
                <div className={limitPositions.left ? "leftBlur off" : "leftBlur"}/>
                <div className={limitPositions.right ? "rightBlur off" : "rightBlur"}/>
                <div className="leftRedSignal" ref={leftRedSignal}/>
                <div className="rightRedSignal" ref={rightRedSignal}/>
            </div>
            <div style={{margin: "3px", float: "right"}}>
                <Arrow
                    direction='right'
                    onClick={rightMotion}
                    ref={rightArrow}
                />
            </div>
        </div>
    );
};

export default SelectCuisineLine;