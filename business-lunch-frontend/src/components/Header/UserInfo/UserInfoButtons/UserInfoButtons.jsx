import React, {useContext} from 'react';
import cl from './UserInfoButtons.module.css'
import {AuthContext} from "../../../../context/context";

const UserInfoButtons = ({pressMenuButton}) => {
    const {currentUser} = useContext(AuthContext)

    return (
        <div className={cl.userInfoMenuMain}>
            {
                currentUser &&
                <span className={cl.currentUserName}>{currentUser.firstName + " " + currentUser.lastName}</span>
            }
            <div className={cl.userInfoMenuButton} onClick={pressMenuButton}>
                <div className={cl.line1}/>
                <div className={cl.line2}/>
                <div className={cl.line3}/>
            </div>
        </div>
    );
};

export default UserInfoButtons;