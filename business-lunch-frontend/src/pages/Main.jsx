import '../App.css';
import React, {useEffect, useState} from "react";
import Menu from "../components/Menu/Menu";
import RestaurantList from "../components/RestaurantList/RestaurantList";
import Header from "../components/Header/Header";
import SortAndSearchPanel from "../components/SortAndSearchPanel/SortAndSearchPanel";
import SpecialOffer from "../components/SpecialOffer/SpecialOffer";
import restaurant from "./Restaurant";

function Main() {
    const [menu, setMenu] = useState(false)
    const [contentForMenu, setContentForMenu] = useState('')

    const [valueForSort, setValueForSort] = useState('rating')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCuisine, setSelectedCuisine] = useState('')
    const [specialOfferRestaurant, setSpecialOfferRestaurant] = useState(null)

    function showMenu(restaurant) {
        if (menu) {
            setMenu(false)
        } else {
            setMenu(true)
            setContentForMenu(restaurant)
        }
    }

    function trySpecialOffer(restaurant) {
        setSpecialOfferRestaurant(restaurant)
    }

    return (
        <div className="App">
            <SpecialOffer
                trySpecialOffer={trySpecialOffer}
            />
            <RestaurantList
                showMenu={showMenu}
                valueForSort={valueForSort}
                searchQuery={searchQuery}
                selectedCuisine={selectedCuisine}
                specialOfferRestaurant={specialOfferRestaurant}
                setSpecialOfferRestaurant={setSpecialOfferRestaurant}
            />
            <SortAndSearchPanel
                selectValueForSort={setValueForSort}
                getValueForFilter={setSearchQuery}
                selectСuisine={setSelectedCuisine}
            />
            <Menu restaurant={contentForMenu} active={menu} setActive={setMenu}/>
        </div>);
}

export default Main;
