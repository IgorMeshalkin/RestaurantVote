import React, {useContext, useEffect, useState} from 'react';
import cl from './MyRestaurants.module.css'
import {AuthContext} from "../../context/context";
import Menu from "../Menu/Menu";
import {useNavigate} from "react-router-dom";
import AuthAPI from "../../API/AuthAPI";
import PizzaLoader from "../Loaders/PizzaLoader";
import RestaurantItem from "../RestaurantList/RestaurantItem/RestaurantItem";
import Modal from "../Modal/Modal";
import DeleteForm from "../DeleteForm/DeleteForm";

const MyRestaurants = () => {
    const {currentUser} = useContext((AuthContext))
    const navigate = useNavigate()

    const [myRestaurants, setMyRestaurants] = useState([])
    const [menu, setMenu] = useState(false)
    const [contentForMenu, setContentForMenu] = useState('')

    const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(true)

    const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)
    const [selectedForDeleteRestaurant, setSelectedForDeleteRestaurant] = useState({})
    const [isFirstLoading, setIsFirstLoading] = useState(true)

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
            currentUser !== null ?
                getRestaurantsByCurrentUser() :
                navigate("/")
        }
    }, [])

    function createRestaurant() {
        navigate("/restaurant_form/0")
    }

    async function getRestaurantsByCurrentUser() {
        setIsRestaurantsLoading(true)
        const res = await AuthAPI.login(currentUser.username, currentUser.password)
        setMyRestaurants(res.data.restaurants)
        setIsRestaurantsLoading(false)
    }

    useEffect(() => {
        if (!isFirstLoading) {
            setIsDeleteModalActive(true)
        }
        setIsFirstLoading(false)
    }, [selectedForDeleteRestaurant])

    return (
        <div className={cl.mrMain}>
            <div className={cl.mrStack}>
                <div className={cl.mrTitle}>Ваши рестораны</div>
                <div className={cl.newRestButtonContainer} onClick={createRestaurant}>Создать ресторан</div>

                {
                    isRestaurantsLoading ?
                        <div className={cl.loaderContainer}>
                            <PizzaLoader/>
                        </div>
                        :
                        <>
                            {
                                myRestaurants.length > 0 ?
                                    <div className={cl.mrRestaurantListContainer}>
                                        {
                                            myRestaurants.map(rest =>
                                                <RestaurantItem
                                                    key={rest.id}
                                                    restaurant={rest}
                                                    showMenu={showMenu}
                                                    onDeleteButtonClick={() => setSelectedForDeleteRestaurant(rest)}
                                                />
                                            )
                                        }
                                    </div> :
                                    <div className={cl.noRestaurants}>
                                        У вас пока нет ресторанов
                                    </div>
                            }
                        </>
                }
                <Menu restaurant={contentForMenu} active={menu} setActive={setMenu}/>
                <Modal
                    active={isDeleteModalActive}
                    setActive={setIsDeleteModalActive}
                >
                    <DeleteForm
                        itemForDelete={selectedForDeleteRestaurant}
                        setModalActive={setIsDeleteModalActive}
                        updatePage={getRestaurantsByCurrentUser}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default MyRestaurants;