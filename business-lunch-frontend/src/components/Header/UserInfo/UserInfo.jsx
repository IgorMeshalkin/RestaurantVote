import React, {useContext} from 'react';
import cl from './UserInfo.module.css'
import {AuthContext} from "../../../context/context";
import UserInfoMenu from "./UserInfoMenu/UserInfoMenu";
import {useNavigate} from "react-router-dom";

const UserInfo = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <div className={cl.userInfoMain}>
            {
                isAuth ?
                    <UserInfoMenu/> :
                    <span onClick={() => navigate('/login')} className={cl.signInButton}>Войти</span>
            }
        </div>
    );
};

export default UserInfo;