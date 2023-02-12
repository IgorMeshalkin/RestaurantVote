import React from 'react';
import RestaurantForm from "../components/RestaurantForm/RestaurantForm";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAPI} from "../hooks/useAPI";
import RestaurantsAPI from "../API/RestaurantsAPI";
import PizzaLoader from "../components/Loaders/PizzaLoader";

const RestaurantFormPage = () => {
    const params = useParams()
    const [restaurant, setRestaurant] = useState({})

    const [isUpdate, setIsUpdate] = useState(params.id > 0)

    useEffect(() => {
        if (isUpdate) {
            fetchRestaurant()
        }
    }, [])

    const [fetchRestaurant, isRestaurantLoading, restaurantLoadingError] = useAPI(async () => {
        const response = await RestaurantsAPI.getById(params.id)
        setRestaurant(response.data)
    })

    return (
        <div className="allInCenter">
            {(isRestaurantLoading && isUpdate) ?
                <PizzaLoader/> :
                <RestaurantForm
                    restaurant={restaurant}
                    isUpdate={isUpdate}
                />}
        </div>
    );
};

export default RestaurantFormPage;