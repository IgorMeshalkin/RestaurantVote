import React, {useState} from 'react';
import cl from './RestaurantItem.module.css'
import CuisineLogo from "./CuisineLogo/CuisineLogo";
import RegularButton from "../../UI/RegularButton/RegularButton";
import {useNavigate} from "react-router-dom";

const RestaurantItem = ({restaurant, showMenu}) => {
    const navigate = useNavigate()

    function openMenu() {
        showMenu(restaurant)
    }

    return (
        <div className={cl.item}>
            <CuisineLogo cuisine={restaurant.cuisine}/>
            <div className={cl.center}>
                <div onClick={() => navigate('/restaurant/' + restaurant.id)} className={cl.name}>
                    {restaurant.name}
                </div>
                <div className={cl.rating}>
                    <span>
                        &#11088;
                    </span>
                    <span className={cl.ratingNumber}>
                        {restaurant.rating}
                    </span>
                </div>
                <div>
                    {restaurant.address}
                </div>
                <div>
                    {restaurant.lunchTime}
                </div>
            </div>
            <div className={cl.right}>
                <div>
                    {restaurant.price} ₽
                </div>
                <div>
                    <RegularButton onClick={openMenu}>Смотреть меню</RegularButton>
                </div>
            </div>
        </div>
    );
};

export default RestaurantItem;