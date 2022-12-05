import React, {forwardRef, useEffect, useRef} from 'react';
import './Arrow.css'

const Arrow = forwardRef((props, ref) => (
    <div className="arrowContainer" onClick={props.onClick} ref={ref}>
        <div className={props.direction === 'left' ? "left1" : "left1 right1"}/>
        <div className={props.direction === 'left' ? "left2" : "left2 right2"}/>
    </div>
));

export default Arrow;