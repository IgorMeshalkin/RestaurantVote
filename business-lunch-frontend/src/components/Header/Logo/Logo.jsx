import React, {useEffect, useRef, useState} from 'react';
import './Logo.css'
import pizza from '../../../images/loader/pizza1.png'

const Logo = () => {
    const [isPizzaRotate, setIsPizzaRotate] = useState(false)

    function startRotate() {
        if (!isPizzaRotate) {
            setIsPizzaRotate(true)
            setTimeout(() => setIsPizzaRotate(false), 2000)
        }
    }

    function Pizza() {
        return (
            <img
                src={pizza}
                className={isPizzaRotate ? "imgPizza rotate" : "imgPizza"}
            />
        );
    }

    return (
        <div className="logoMain" onClick={startRotate}>
            <div className="logoPizzaOuterBorder"/>
            <div className="logoPizzaInnerBorder"/>
            <div className="hiderBorder"/>

            <Pizza/>

            <div className="businessBlock">
                <div className="business">
                    Business
                </div>
                <div className="slogan">
                    обедай со вкусом
                </div>
            </div>
            <div className="lunch">
                Lunch
            </div>
        </div>
    );
};


export default Logo;