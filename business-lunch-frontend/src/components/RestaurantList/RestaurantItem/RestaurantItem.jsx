import React, {useContext} from 'react';
import cl from './RestaurantItem.module.css'
import CuisineLogo from "./CuisineLogo/CuisineLogo";
import RegularButton from "../../UI/RegularButton/RegularButton";
import {useNavigate} from "react-router-dom";
import UpdateButton from "../../UI/UpdateButton/UpdateButton";
import DeleteButton from "../../UI/DeleteButton/DeleteButton";
import {AuthContext} from "../../../context/context";
import {isOwnedByCurrentUser} from "../../../utils/restaurantsOwners";

const RestaurantItem = ({restaurant, showMenu}) => {
    const {currentUser, isAdmin} = useContext(AuthContext)
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
                <div className={cl.restItemPrice}>
                    {restaurant.price} ₽
                </div>
                <div className={cl.showMenuButtonContainer}>
                    <RegularButton onClick={openMenu}>Смотреть меню</RegularButton>
                </div>

                {
                    (isOwnedByCurrentUser(restaurant, currentUser) || isAdmin) &&
                    <div className={cl.updateAndDeleteButtonsContainer}>
                        <UpdateButton
                            onClick={() => navigate('/restaurant_form/' + restaurant.id)}
                        />
                        <DeleteButton/>
                    </div>
                }
            </div>
        </div>
    );
};

export default RestaurantItem;