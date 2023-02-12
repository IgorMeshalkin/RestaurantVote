import React, {useEffect, useRef, useState} from 'react';
import './MenuEditor.css'
import Meal from "./Meal/Meal";
import PlusButton from "../../UI/PlusButton/PlusButton";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const MenuEditor = ({menu, setMenu, replaceMenuSize}) => {

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
        </div>
    );
};

export default MenuEditor;