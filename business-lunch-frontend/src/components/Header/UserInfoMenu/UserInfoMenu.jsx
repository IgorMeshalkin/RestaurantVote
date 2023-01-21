import React, {useEffect, useRef} from 'react';
import cl from './UserInfoMenu.module.css'
import {useContext} from "react";
import {AuthContext} from "../../../context/context";

const UserInfoMenu = ({isOpen}) => {
    const {isAdmin, setCurrentUser} = useContext(AuthContext)

    const userInfoMenuRef = useRef()

    useEffect(() => {
        if (isOpen) {
            userInfoMenuRef.current.setAttribute('style', 'top: 52px')
        } else {
            userInfoMenuRef.current.setAttribute('style', 'top: -130px')
        }
    }, [isOpen])

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
            <div className={cl.uimButton}>Мои рестораны</div>
            <div className={cl.uimButton} onClick={logout}>Выход</div>

        </div>
    );
};

export default UserInfoMenu;