import React, {useEffect, useState} from 'react';
import './SortAndSearchPanel.css'
import SearchLine from "./SearchLine/SearchLine";
import DropDownList from "../UI/DropDownList/DropDownList";
import SelectCuisineLine from "./SelectСuisineLine/SelectСuisineLine";

const SortAndSearchPanel = ({getValueForFilter, selectСuisine, selectValueForSort}) => {
    const [scroll, setScroll] = useState(0);
    const [searchVisible, setSearchVisible] = useState(true)
    const [windowWidth, setWindowWidth] = useState(0)
    const [sortListIsOpen, setSortListIsOpen] = useState(false)
    const [cuisineListIsOpen, setCuisineListIsOpen] = useState(false)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    useEffect(() => {
        if (!searchVisible) {
            setSortListIsOpen(false)
            setCuisineListIsOpen(false)
        }
    }, [searchVisible])

    useEffect(() => {
        if (sortListIsOpen && windowWidth <= 700) {
            setCuisineListIsOpen(false)
        }
    }, [sortListIsOpen])

    useEffect(() => {
        if (cuisineListIsOpen) {
            setSortListIsOpen(false)
        }
    }, [cuisineListIsOpen])

    const [valueForSort, setValueForSort] = useState([
        {id: 1, title: 'По популярности', value: 'rating'},
        {id: 2, title: 'Сначала дешевые', value: 'firstCheap'},
        {id: 3, title: 'Сначала дорогие', value: 'firstExpensive'}
    ])

    const [cuisine, setCuisine] = useState([
        {id: 1, title: 'Любая', value: 'ALL'},
        {id: 2, title: 'Американская', value: 'AMERICAN'},
        {id: 3, title: 'Китайская', value: 'CHINESE'},
        {id: 4, title: 'Французская', value: 'FRENCH'},
        {id: 5, title: 'Индийская', value: 'INDIAN'},
        {id: 6, title: 'Итальянская', value: 'ITALIAN'},
        {id: 7, title: 'Японская', value: 'JAPANESE'},
        {id: 8, title: 'Мексиканская', value: 'MEXICAN'},
        {id: 9, title: 'Русская', value: 'RUSSIAN'},
        {id: 10, title: 'Тайская', value: 'THAI'},
        {id: 11, title: 'Турецкая', value: 'TURKISH'},
    ])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [scroll])

    function handleScroll() {
        if (window.scrollY > scroll) {
            setSearchVisible(false)
        } else {
            setSearchVisible(true)
        }
        setScroll(window.scrollY);
    };

    return (
        <div>
            <div className={searchVisible ? 'sortAndSearchPanel' : 'sortAndSearchPanel active'}>
                <div className="searchBlock">
                    <SearchLine
                        getValueForFilter={getValueForFilter}
                    />
                </div>
                <div className="selectCuisineBlock">
                    {
                        windowWidth > 700
                            ? <SelectCuisineLine
                                selectСuisine={selectСuisine}
                                cuisines={cuisine}
                                setCuisines={setCuisine}
                            />
                            : <DropDownList
                                selectValueForSort={selectСuisine}
                                selectList={cuisine}
                                setSelectList={setCuisine}
                                dropDownListIsOpen={cuisineListIsOpen}
                                setDropDownListIsOpen={setCuisineListIsOpen}
                            />
                    }
                </div>
                <div className="sortBlock">
                    <DropDownList
                        selectValueForSort={selectValueForSort}
                        selectList={valueForSort}
                        setSelectList={setValueForSort}
                        dropDownListIsOpen={sortListIsOpen}
                        setDropDownListIsOpen={setSortListIsOpen}
                    />
                </div>
            </div>
        </div>
    );
};

export default SortAndSearchPanel;