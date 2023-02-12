import React, {useRef} from 'react';
import InputText from "../../../UI/InputText/InputText";
import './Meal.css'
import CloseButton from "../../../UI/CloseButton/CloseButton";

const Meal = ({meal, menu, setMenu, deleteFromMenu}) => {
    const nameRef = useRef()
    const weightRef = useRef()

    function deleteCurrentMeal() {
        deleteFromMenu(meal)
    }

    function updateMealInMenu() {
        setMenu(menu.map(m =>
            m.id === meal.id ? {...meal, name: nameRef.current.value, weight: weightRef.current.value} : m
        ))
    }

    return (
        <div className="mealMain">
            <div className="mealNameContainer">
                <InputText value={meal.name} placeholder="Название" ref={nameRef} onChange={updateMealInMenu}/>
            </div>
            <div className="mealWeightContainer">
                <InputText value={meal.weight} placeholder="Вес(гр.)" ref={weightRef} onChange={updateMealInMenu}/>
            </div>
            <div className="closeButtonContainer">
                <CloseButton onClick={deleteCurrentMeal}/>
            </div>
        </div>
    );
};

export default Meal;