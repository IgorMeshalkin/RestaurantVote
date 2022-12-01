import React, {useEffect, useRef} from 'react';
import './SpecialOfferLine.css'
import SpecialOfferItem from "./SpecialOfferItem/SpecialOfferItem";

const SpecialOfferLine = ({specialOffers, itemWidth, lineLength, linePosition}) => {
    const specialOfferLineRef = useRef()

    useEffect(() => {
        specialOfferLineRef.current.setAttribute('style', 'width:' + lineLength + 'px')
    }, [])

    useEffect(() => {
        specialOfferLineRef.current.setAttribute('style', 'left:' + linePosition + 'px')
    }, [linePosition])

    return (
        <div className="specialOfferLine" ref={specialOfferLineRef}>
            {
                specialOffers.map(offer =>
                    <SpecialOfferItem
                        key={offer.id}
                        specialOffer={offer}
                        width={itemWidth}
                    />
                )
            }
        </div>
    );
};

export default SpecialOfferLine;