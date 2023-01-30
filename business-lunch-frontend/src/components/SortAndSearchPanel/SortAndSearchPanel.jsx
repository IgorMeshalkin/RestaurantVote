import React, {useEffect, useState} from 'react';
import './SortAndSearchPanel.css'
import SearchLine from "./SearchLine/SearchLine";
import DropDownList from "../UI/DropDownList/DropDownList";
import SelectCuisineLine from "./SelectСuisineLine/SelectСuisineLine";
import {getCuisinesArray} from "../../utils/arrays";

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

    const [cuisine, setCuisine] = useState(getCuisinesArray())

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