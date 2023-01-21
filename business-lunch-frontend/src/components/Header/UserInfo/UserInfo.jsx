import React, {useContext, useState} from 'react';
import cl from './UserInfo.module.css'
import {AuthContext} from "../../../context/context";
import UserInfoButtons from "./UserInfoButtons/UserInfoButtons";
import {useNavigate} from "react-router-dom";
import UserInfoMenu from "../UserInfoMenu/UserInfoMenu";

const UserInfo = ({menuIsOpen, setMenuIsOpen}) => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <div className={cl.userInfoMain}>
            {
                isAuth ?
                    <UserInfoButtons pressMenuButton={() => setMenuIsOpen(!menuIsOpen)}/> :
                    <span onClick={() => navigate('/login')} className={cl.signInButton}>Войти</span>
            }
        </div>
    );
};

export default UserInfo;