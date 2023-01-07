import React from 'react';
import './Header.css'
import Logo from "./Logo/Logo";
import {Link, Outlet} from "react-router-dom"

const Header = () => {

    return (
        <>
            <Link to="/" className="header">
                <Logo/>
            </Link>
            <Outlet/>
        </>
    );
};

export default Header;