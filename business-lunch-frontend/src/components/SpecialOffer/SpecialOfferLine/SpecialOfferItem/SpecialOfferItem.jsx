import React, {useEffect, useRef} from 'react';
import cl from './SpecialOfferItem.module.css'

const SpecialOfferItem = ({specialOffer, width}) => {
    const specialOfferItemRef = useRef()
    useEffect(() => {
        specialOfferItemRef.current.setAttribute('style', 'width:' + width + 'px')
    }, [])

    return (
        <div className={cl.specialOfferItem} ref={specialOfferItemRef}>
            <img src={specialOffer.photo} className={cl.specialOfferImg}/>
            <div className={cl.title}>
                {specialOffer.name}
            </div>
            <div className={cl.description}>
                {specialOffer.description}
            </div>
        </div>
    );
};

export default SpecialOfferItem;