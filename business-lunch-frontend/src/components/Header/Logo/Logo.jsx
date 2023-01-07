import React, {useEffect, useRef, useState} from 'react';
import './Logo.css'
import pizza from "../../../images/loader/pizza1.png";

const Logo = () => {
    const [isRotate, setIsRotate] = useState(false)

    function Pizza() {
        return (
            <img
                src={pizza}
                className={isRotate ? "logoPizza rotate" : "logoPizza"}
            />
        );
    }

    function startRotate() {
        if(!isRotate) {
            setIsRotate(true)
            setTimeout(() => setIsRotate(false), 2000)
        }
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