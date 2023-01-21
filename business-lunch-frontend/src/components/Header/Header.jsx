import React from 'react';
import './Header.css'
import Logo from "./Logo/Logo";
import {Link, Outlet} from "react-router-dom"
import UserInfo from "./UserInfo/UserInfo";

const Header = () => {

    return (
        <>
            <Link to="/" className="header">
                <Logo/>
            </Link>
            <UserInfo/>
            <Outlet/>
        </>
    );
};

export default Header;