import React, {useContext, useEffect, useRef} from 'react';
import cl from './UserInfoMenu.module.css'
import {AuthContext} from "../../../context/context";
import {useNavigate} from "react-router-dom";

const UserInfoMenu = ({isOpen}) => {
    const {isAdmin, setCurrentUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const userInfoMenuRef = useRef()

    useEffect(() => {
        if (isOpen) {
            userInfoMenuRef.current.setAttribute('style', 'top: 52px')
        } else {
            userInfoMenuRef.current.setAttribute('style', 'top: -130px')
        }
    }, [isOpen])

    function toMyRestaurants() {
        navigate('/my_restaurants')
        userInfoMenuRef.current.setAttribute('style', 'top: -130px')
    }

    function logout() {
        setCurrentUser(null)
        userInfoMenuRef.current.setAttribute('style', 'top: -130px')
    }

    return (
        <div className={cl.uimBackground} ref={userInfoMenuRef}>
            {
                isAdmin &&
                <div className={cl.uimButton}>Администрирование</div>
            }
            <div className={cl.uimButton} onClick={() => console.log(isAdmin)}>Мой профиль</div>
            <div className={cl.uimButton} onClick={toMyRestaurants}>Мои рестораны</div>
            <div className={cl.uimButton} onClick={logout}>Выход</div>

        </div>
    );
};

export default UserInfoMenu;