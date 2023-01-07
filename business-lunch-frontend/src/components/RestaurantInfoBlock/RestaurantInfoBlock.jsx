import cl from './RestaurantInfoBlock.module.css'
import React, {useEffect, useRef} from "react";
import {conversionStyleWithPxToNumber} from "../../utils/strings";

const RestaurantInfoBlock = (props) => {
    const mainRef = useRef()

    useEffect(() => {
        props.getWidth(mainRef.current.getBoundingClientRect().width +
            conversionStyleWithPxToNumber(window.getComputedStyle(mainRef.current).marginLeft))
    }, [])

    return (
        <div className={cl.main} ref={mainRef}>
            <div className={cl.name}>{props.restaurant.name}</div>
            <div>
                <span className={cl.ratingStar}>&#11088;</span>
                <span className={cl.ratingNumber}>{props.restaurant.rating}</span>
            </div>
            <div>
                <div className={cl.lunchTimeTitle}>Время обеда:</div>
                <div className={cl.lunchTimeValue}>{props.restaurant.lunchTime}</div>
            </div>
            <div>
                <div className={cl.infoTitle}>Адрес:</div>
                <div className={cl.infoValue}>{props.restaurant.address}</div>
            </div>
            <div>
                <div className={cl.infoTitle}>Телефон:</div>
                <div className={cl.infoValue}>{props.restaurant.phoneNumber}</div>
            </div>
            <div>
                <div className={cl.infoTitle}>Меню:</div>
                <table className={cl.generalTable}>
                    <tbody>
                    {
                        props.restaurant.menu.map(meal =>
                            <tr key={meal.id}>
                                <td className={cl.tableCounterColumn}>{props.restaurant.menu.indexOf(meal) + 1} -</td>
                                <td className={cl.tableNameColumn}>{meal.name}</td>
                                <td className={cl.tableWeightColumn}>{meal.weight} гр.</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div className={cl.priceBlock}>
                <div className={cl.infoTitle}>Цена:</div>
                <div className={cl.price}>{props.restaurant.price} ₽</div>
            </div>
        </div>
    );
};

export default RestaurantInfoBlock;