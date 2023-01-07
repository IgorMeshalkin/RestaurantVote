import React, {useEffect, useState} from 'react';
import "./Menu.css"
import image from '../../images/menu.png'
import CloseButton from "../UI/CloseButton/CloseButton";

const Menu = ({restaurant, active, setActive}) => {
    const [date, setDate] = useState('')

    useEffect(() => {
        if (restaurant) {
            changeDateForTitle()
        }
    }, [restaurant])

    let counter = 0
    let result = restaurant.menu?.map((meal) => {
        counter += 1
        return (<tr key={meal.id}>
            <td className="number">{counter} -</td>
            <td className="name">{meal.name}</td>
            <td className="weight">{meal.weight} гр.</td>
        </tr>);
    });

    function changeDateForTitle() {
        const currentDateTime = new Date()
        const endTime = restaurant.lunchTime.split(' ')[2].split(':')

        if (endTime[0] < currentDateTime.getHours()) {
            currentDateTime.setDate(currentDateTime.getDate() + 1)
        } else if (endTime[0] < (currentDateTime.getHours() + 1)
            && endTime[1] < currentDateTime.getMinutes()) {
            currentDateTime.setDate(currentDateTime.getDate() + 1)
        }

        const day = currentDateTime.getDate() < 10 ? '0' + currentDateTime.getDate() : currentDateTime.getDate()
        const month = (currentDateTime.getMonth() + 1) < 10 ? '0' + (currentDateTime.getMonth() + 1) : currentDateTime.getMonth() + 1

        setDate(day + '.' + month)
    }

    function LeftBottomImg() {
        return (
            <img src={image} className="image"/>
        );
    }

    return (
        <div className={active ? 'background active' : 'background'} onClick={() => setActive(false)}>
            <div className={active ? 'window active' : 'window'} onClick={event => event.stopPropagation()}>
                <CloseButton
                    onClick={() => setActive(false)}
                    top={5}
                    right={5}
                />
                <span className="title">Меню ресторана "{restaurant.name}" на {date}</span>
                <table className="table">
                    <tbody className="tableBody">
                    {result}
                    </tbody>
                </table>
                <LeftBottomImg/>
                <div className="price">
                    {restaurant.price} ₽
                </div>
            </div>
        </div>
    );
};

export default Menu;