import React from 'react';
import './Logo.css'
import pizza from "../../../images/loader/pizza1.png";

const Logo = () => {
    function Pizza() {
        return (
            <img src={pizza} className="logoPizza"/>
        );
    }

    return (
        <div className="logoMain">
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