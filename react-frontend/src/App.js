import './App.css';
import React, {useState} from "react";
import Menu from "./components/Menu/Menu";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import Header from "./components/Header/Header";
import SortAndSearchPanel from "./components/SortAndSearchPanel/SortAndSearchPanel";
import SpecialOffer from "./components/SpecialOffer/SpecialOffer";

function App() {
    const [menu, setMenu] = useState(false)
    const [contentForMenu, setContentForMenu] = useState('')

    const [valueForSort, setValueForSort] = useState('rating')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCuisine, setSelectedCuisine] = useState('')

    function showMenu(restaurant) {
        if (menu) {
            setMenu(false)
        } else {
            setMenu(true)
            setContentForMenu(restaurant)
        }
    }

    return (
        <div className="App">
            <SpecialOffer/>
            <RestaurantList
                showMenu={showMenu}
                valueForSort={valueForSort}
                searchQuery={searchQuery}
                selectedCuisine={selectedCuisine}
            />
            <SortAndSearchPanel
                selectValueForSort={setValueForSort}
                getValueForFilter={setSearchQuery}
                selectСuisine={setSelectedCuisine}
            />
            <Header/>
            <Menu restaurant={contentForMenu} active={menu} setActive={setMenu}/>
        </div>);
}

export default App;
