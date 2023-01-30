import React, {useContext, useEffect, useState} from 'react';
import cl from './MyRestaurants.module.css'
import {AuthContext} from "../../context/context";
import RestaurantItem from "../RestaurantList/RestaurantItem/RestaurantItem";
import Menu from "../Menu/Menu";

const MyRestaurants = () => {
    const {currentUser} = useContext((AuthContext))

    const [myRestaurants, setMyRestaurants] = useState([])
    const [menu, setMenu] = useState(false)
    const [contentForMenu, setContentForMenu] = useState('')
    // const [isRestaurantFormVisible, setIsRestaurantFormVisible] = useState(false)
    // const [selectedRestaurant, setSelectedRestaurant] = useState({})

    // useEffect(() => {
    //     setIsRestaurantFormVisible(true)
    // }, [selectedRestaurant])
    //
    // function updateRestaurant(restaurant) {
    //     setSelectedRestaurant(restaurant)
    // }

    function showMenu(restaurant) {
        if (menu) {
            setMenu(false)
        } else {
            setMenu(true)
            setContentForMenu(restaurant)
        }
    }

    useEffect(() => {
        {
            currentUser &&
            setMyRestaurants(currentUser.restaurants)
        }
    }, [currentUser])

    return (
        <div className={cl.mrMain}>
            <div className={cl.mrStack}>
                <div className={cl.mrTitle}>Ваши рестораны</div>
                <div className={cl.newRestButtonContainer}>Создать ресторан</div>

                {/*<div className={cl.mrLine}/>*/}

                {
                    myRestaurants.map(rest =>
                        <RestaurantItem
                            key={rest.id}
                            restaurant={rest}
                            showMenu={showMenu}
                            // updateButtonClick={updateRestaurant}
                        />
                    )
                }
                <Menu restaurant={contentForMenu} active={menu} setActive={setMenu}/>
            </div>
        </div>
    );
};

export default MyRestaurants;