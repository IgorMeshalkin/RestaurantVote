import React, {useEffect, useRef, useState} from 'react';
import './MenuEditor.css'
import Meal from "./Meal/Meal";
import PlusButton from "../../UI/PlusButton/PlusButton";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const MenuEditor = ({menu, setMenu, replaceMenuSize, plusRef}) => {

    // function addMealToMenu() {
    //     replaceMenuSize(1)
    //     const newMenu = [...menu];
    //     newMenu.push({id: Date.now(), name: '', weight: ''})
    //     setMenu(newMenu)
    // }

    function deleteMealFromMenu(meal) {
        replaceMenuSize(-1)
        setMenu([...menu].filter(m => m.id !== meal.id))
    }

    return (
        <div className="meMain">
            <TransitionGroup>
                {
                    menu.map(meal =>
                        <CSSTransition
                            key={meal.id}
                            timeout={500}
                            classNames="meMeals"
                        >
                            <Meal
                                meal={meal}
                                menu={menu}
                                setMenu={setMenu}
                                deleteFromMenu={deleteMealFromMenu}/>
                        </CSSTransition>
                    )
                }
            </TransitionGroup>
            {/*<div className="mePlusContainer" ref={plusRef}>*/}
            {/*    <PlusButton onClick={addMealToMenu}/>*/}
            {/*</div>*/}
        </div>
    );
};

export default MenuEditor;