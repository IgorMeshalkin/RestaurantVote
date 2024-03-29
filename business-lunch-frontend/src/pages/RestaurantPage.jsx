import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import RestaurantsAPI from "../API/RestaurantsAPI";
import {useAPI} from "../hooks/useAPI";
import RestaurantPhotosBlock from "../components/RestaurantPhotosBlock/RestaurantPhotosBlock";
import RestaurantInfoBlock from "../components/RestaurantInfoBlock/RestaurantInfoBlock";
import '../App.css'
import CommentsBlock from "../components/CommentsBlock/CommentsBlock";

const RestaurantPage = () => {
    const params = useParams()
    const navigate = useNavigate();

    const [restaurant, setRestaurant] = useState()
    const [photoWidth, setPhotoWidth] = useState()
    const [infoWidth, setInfoWidth] = useState()

    useEffect(() => {
        fetchFirstPage()
    }, [])

    const [fetchFirstPage, isPageLoading, firstPageLoadingError] = useAPI(async () => {
        const response = await RestaurantsAPI.getById(params.id)
        setRestaurant(response.data)
    })

    return (
        <div className="App">
            {restaurant &&
                <div className="restaurantPage">
                    <div className="photoAndInfoContainer">
                        <RestaurantPhotosBlock
                            photos={restaurant.photos}
                            getWidth={setPhotoWidth}/>

                        <RestaurantInfoBlock
                            restaurant={restaurant}
                            getWidth={setInfoWidth}/>
                    </div>

                    <div className="commentsContainer" style={{width: photoWidth + infoWidth + "px"}}>
                        <CommentsBlock
                            restaurantId={restaurant.id}
                            width={photoWidth + infoWidth}
                        />
                    </div>
                </div>
            }
        </div>
    );
};

export default RestaurantPage;