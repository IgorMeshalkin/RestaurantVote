import React, {useState} from 'react';
import {useEffect} from "react";

export const usePressingButton = (buttonRef) => {
    const [isPressing, setIsPressing] = useState(false)

    useEffect(() => {
        buttonRef.current.addEventListener('mousedown', (event) => setIsPressing(true))
        buttonRef.current.addEventListener('mouseup', (event) => setIsPressing(false))
        return () => {
            buttonRef.current.removeEventListener('mousedown', (event) => setIsPressing(true))
            buttonRef.current.removeEventListener('mouseup', (event) => setIsPressing(false))
        }
    }, [])

    return isPressing
};