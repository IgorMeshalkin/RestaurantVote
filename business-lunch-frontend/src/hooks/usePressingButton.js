import React, {useState} from 'react';
import {useEffect} from "react";

export const usePressingButton = (buttonRef) => {
    const [isPressing, setIsPressing] = useState(false)

    useEffect(() => {
        const ref = buttonRef.current;

        const setTrue = (event) => setIsPressing(true);
        const setFalse = (event) => setIsPressing(false);

        ref.addEventListener('mousedown', setTrue);
        ref.addEventListener('mouseup', setFalse);

        return () => {
            ref.removeEventListener('mousedown', setTrue);
            ref.removeEventListener('mouseup', setFalse);
        }
    }, []);

    return isPressing
};