import React from 'react';
import './Header.css'
import Logo from "./Logo/Logo";
import {Link, Outlet} from "react-router-dom"
import UserInfo from "./UserInfo/UserInfo";
import {useState} from "react";
import UserInfoMenu from "./UserInfoMenu/UserInfoMenu";

const Header = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    return (
        <>
            <Link to="/" className="header">
                <Logo/>
            </Link>
            <UserInfo
                menuIsOpen={menuIsOpen}
                setMenuIsOpen={setMenuIsOpen}
            />
            <UserInfoMenu
                isOpen={menuIsOpen}
            />
            <Outlet/>
        </>
    );
};

export default Header;