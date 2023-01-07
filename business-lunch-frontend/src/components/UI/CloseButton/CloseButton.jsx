import React, {useEffect, useRef} from 'react';
import cl from './CloseButton.module.css'

const CloseButton = ({onClick, top, right}) => {
    const closeButtonRef = useRef()

    useEffect(() => {
        closeButtonRef.current.setAttribute('style','top:' + top + 'px; right:' + right + 'px;')
    }, [])

    return (
        <div onClick={onClick} className={cl.main} ref={closeButtonRef}>
            <div className={cl.background}/>
            <div className={cl.left}/>
            <div className={cl.right}/>
        </div>
    );
};

export default CloseButton;