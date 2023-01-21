import React, {useContext} from 'react';
import cl from './UserInfoMenu.module.css'
import {AuthContext} from "../../../../context/context";

const UserInfoMenu = () => {
    const {isAuth, setIsAuth, currentUser, setCurrentUser} = useContext(AuthContext)

    function logOut() {
        setCurrentUser(null)
        setIsAuth(false)
    }

    return (
        <div className={cl.userInfoMenuMain}>
            <span className={cl.currentUserName}>{currentUser.firstName + " " + currentUser.lastName}</span>
            <div className={cl.userInfoMenuButton} onClick={logOut}>
                <div className={cl.line1}/>
                <div className={cl.line2}/>
                <div className={cl.line3}/>
            </div>
        </div>
    );
};

export default UserInfoMenu;