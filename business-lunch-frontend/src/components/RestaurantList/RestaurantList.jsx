import React, {useEffect, useRef, useState} from 'react';
import RestaurantsAPI from "../../API/RestaurantsAPI";
import './RestaurantList.css'
import {useAPI} from '../../hooks/useAPI'
import {getPagesCount} from "../../utils/pages";
import PizzaLoader from "../Loaders/PizzaLoader";
import RestaurantItem from "./RestaurantItem/RestaurantItem";
import LineLoader from "../Loaders/LineLoader";
import Modal from "../Modal/Modal";
import DeleteForm from "../DeleteForm/DeleteForm";

const RestaurantList = (props) => {
    const restList = useRef()

    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [allRestaurants, setAllRestaurants] = useState([])
    const [totalRestaurants, setTotalRestaurants] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        if (!props.specialOfferRestaurant && localStorage.getItem('scrollPosition') !== null) {
            window.scrollTo(0, Number(localStorage.getItem('scrollPosition')))
            localStorage.removeItem('scrollPosition');
        }
    }, [allRestaurants]);

    useEffect(() => {
        if (props.specialOfferRestaurant) {
            localStorage.setItem('scrollPosition', String(window.scrollY))
            localStorage.setItem('restaurants', JSON.stringify(allRestaurants));
            window.scrollTo(0, 0)
            setAllRestaurants([props.specialOfferRestaurant])
        } else if (!props.specialOfferRestaurant && localStorage.getItem('restaurants') !== null) {
            setAllRestaurants(JSON.parse(localStorage.getItem('restaurants')))
        }
    }, [props.specialOfferRestaurant])

    useEffect(() => {
        props.setSpecialOfferRestaurant(null)
        window.scrollTo(0, 0)
        fetchFirstPage()
        setPage(1)
    }, [props.valueForSort, props.searchQuery, props.selectedCuisine])

    useEffect(() => {
        if (page > 1) {
            fetchNextPage()
        }
        document.addEventListener('scroll', scrollHandler)
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [page, totalPages])

    function scrollHandler(event) {
        if ((event.target.documentElement.scrollHeight - event.target.documentElement.scrollTop) <= window.innerHeight && page < totalPages) {
            setPage(page + 1)
        }
    }

    const [fetchFirstPage, isFirstPageLoading, firstPageLoadingError] = useAPI(async () => {
        const response = await RestaurantsAPI.getAll(limit, 0, props.valueForSort, props.searchQuery, props.selectedCuisine)
        setAllRestaurants(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalRestaurants(totalCount)
        setTotalPages(getPagesCount(totalCount, limit))
    })

    const [fetchNextPage, isNextPageLoading, nextPageLoadingError] = useAPI(async () => {
        const response = await RestaurantsAPI.getAll(limit, page - 1, props.valueForSort, props.searchQuery, props.selectedCuisine)
        setAllRestaurants([...allRestaurants, ...response.data])
    })

    const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)
    const [selectedForDeleteRestaurant, setSelectedForDeleteRestaurant] = useState({})
    const [isFirstLoading, setIsFirstLoading] = useState(true)

    useEffect(() => {
        if (!isFirstLoading) {
            setIsDeleteModalActive(true)
        }
        setIsFirstLoading(false)
    }, [selectedForDeleteRestaurant])

    return (<div>
        <div className="centerBlock">
            {(firstPageLoadingError || nextPageLoadingError) &&
                <div className="failMessage">
                    {firstPageLoadingError}
                    {nextPageLoadingError}
                </div>}
            {(allRestaurants.length === 0 && !isFirstPageLoading && !firstPageLoadingError) &&
                <div className="failMessage">
                    Ничего не найдено
                </div>}
        </div>

        {isFirstPageLoading ?
            <div className="centerBlock">
                <PizzaLoader/>
            </div> :
            <div className="restList" ref={restList}>
                {allRestaurants.map((restaurant) => <RestaurantItem key={restaurant.id}
                                                                    restaurant={restaurant}
                                                                    showMenu={props.showMenu}
                                                                    onDeleteButtonClick={() => setSelectedForDeleteRestaurant(restaurant)}
                />)}
                {(allRestaurants.length < totalRestaurants && !firstPageLoadingError && !nextPageLoadingError && !props.specialOfferRestaurant) &&
                    <LineLoader/>}
                {props.specialOfferRestaurant &&
                    <div className="backToList" onClick={() => props.setSpecialOfferRestaurant(null)}>Вернуться к
                        списку</div>
                }
            </div>}

        <Modal
            active={isDeleteModalActive}
            setActive={setIsDeleteModalActive}
        >
            <DeleteForm
                itemForDelete={selectedForDeleteRestaurant}
                setModalActive={setIsDeleteModalActive}
                updatePage={fetchFirstPage}
            />
        </Modal>
    </div>);
};

export default RestaurantList;