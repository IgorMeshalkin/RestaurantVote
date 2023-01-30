import React, {useEffect, useRef} from 'react';
import cl from './BoldArrow.module.css'

const BoldArrow = ({direction}) => {
    return (
        <div className={cl.main}>
            <div className={direction === 'up' ? cl.arrowUp : cl.arrowDown}/>
        </div>
    );
};

export default BoldArrow;