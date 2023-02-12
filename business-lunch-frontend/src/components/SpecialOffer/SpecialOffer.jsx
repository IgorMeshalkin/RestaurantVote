import React, {useEffect, useRef, useState} from 'react';
import './SpecialOffer.css'
import Arrow from "../UI/Arrows/Arrow";
import SpecialOfferLine from "./SpecialOfferLine/SpecialOfferLine";
import {usePressingButton} from "../../hooks/usePressingButton";
import {useAPI} from "../../hooks/useAPI";
import SpecialOfferAPI from "../../API/SpecialOfferAPI";

const SpecialOffer = ({trySpecialOffer}) => {
    const leftArrowRef = useRef()
    const rightArrowRef = useRef()
    const isLeftArrowPressing = usePressingButton(leftArrowRef)
    const isRightArrowPressing = usePressingButton(rightArrowRef)

    const areaOfVisibilityRef = useRef()
    const [specialOffers, setSpecialOffers] = useState([])
    const [currentOfferIndex, setCurrentOfferIndex] = useState(0)
    const [areaOfVisibilityWidth, setAreaOfVisiblyWidth] = useState(0)
    const [lineLength, setLineLength] = useState(0)
    const [linePosition, setLinePosition] = useState(0)

    const [fetchSpecialOffers, isLoading, error] = useAPI(async () => {
        const response = await SpecialOfferAPI.getAll()
        setSpecialOffers(response.data)
    })

    useEffect(() => {
        fetchSpecialOffers()
        setAreaOfVisiblyWidth(areaOfVisibilityRef.current.offsetWidth)
    }, [])

    useEffect(() => {
        setLineLength(areaOfVisibilityWidth * specialOffers.length)
    }, [specialOffers])

    useEffect(() => {
        if (isLeftArrowPressing && linePosition === 0) {
            setLinePosition(20)
        }
        if (!isLeftArrowPressing && linePosition === 20) {
            setLinePosition(0)
        }
        if (isRightArrowPressing && linePosition === areaOfVisibilityWidth - lineLength) {
            setLinePosition(areaOfVisibilityWidth - lineLength - 20)
        }
        if (!isRightArrowPressing && linePosition === (areaOfVisibilityWidth - lineLength - 20)) {
            setLinePosition(areaOfVisibilityWidth - lineLength)
        }
    }, [isLeftArrowPressing, isRightArrowPressing])

    function rightMotion() {
        if (linePosition > areaOfVisibilityWidth - lineLength) {
            setLinePosition(linePosition - areaOfVisibilityWidth)
            setCurrentOfferIndex(currentOfferIndex + 1)
        }
    }

    function leftMotion() {
        if (linePosition < 0) {
            setLinePosition(linePosition + areaOfVisibilityWidth)
            setCurrentOfferIndex(currentOfferIndex - 1)
        }
    }

    function tryCurrentOffer() {
        trySpecialOffer(specialOffers[currentOfferIndex].restaurant)
    }

    return (
        <div className="specialOffer">
            <div className="somethingNewText">ЧТО-ТО НОВОЕ</div>
            <div className="specialOfferCenter">
                <div className="arrowArea">
                    <Arrow
                        direction='left'
                        onClick={leftMotion}
                        ref={leftArrowRef}
                    />
                </div>
                <div className="areaOfVisibility" ref={areaOfVisibilityRef}>
                    {areaOfVisibilityWidth > 0 &&
                        <SpecialOfferLine
                            specialOffers={specialOffers}
                            itemWidth={areaOfVisibilityWidth - 1}
                            lineLength={lineLength}
                            linePosition={linePosition}
                        />}
                </div>
                <div className="arrowArea right">
                    <Arrow
                        direction='right'
                        onClick={rightMotion}
                        ref={rightArrowRef}
                    />
                </div>
            </div>
            <div className="wantToTry" onClick={tryCurrentOffer}>ГДЕ ПОПРОБОВАТЬ?</div>
        </div>
    );
};

export default SpecialOffer;