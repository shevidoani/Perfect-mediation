import React from 'react'
import { Outlet, NavLink, useNavigate } from "react-router-dom"

export default function NavBar() {
    const navigate = useNavigate();
    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "red",
    }
    const logOutFunc = () => {
        localStorage.removeItem("currentUser");
        window.history.replaceState(null, '', '/');
        navigate('/login', { replace: true });
    }

    return (
        <>
            <header>
                <nav className='navbar'>
                    <NavLink
                        to="forSale"
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='links'
                    >
                        For Sale
                    </NavLink>
                    <NavLink
                        to="forRent"
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='links'
                    >
                        For Rent
                    </NavLink>
                    <NavLink
                        to="aboutUs"
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='links'
                    >
                        About Us
                    </NavLink>
                    <NavLink
                        to="home"
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='links'
                    >Home </NavLink>
                    <NavLink
                        to="/login"
                        onClick={logOutFunc}
                        style={({ isActive }) => isActive ? activeStyle : null}
                        className='links'
                    > Log Out</NavLink>
                </nav>
            </header>
            <Outlet />
        </>
    )
}

