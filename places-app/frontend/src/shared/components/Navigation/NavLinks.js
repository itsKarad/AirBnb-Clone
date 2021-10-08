import React from "react";
import { NavLink } from "react-router-dom"; 
import './NavLinks.css';

const NavLinks = (props) => {
    return (
        <ul className = "nav-links">
            <li>
                <NavLink to = "/" exact>
                    All users
                </NavLink>
                <NavLink to = "/uid/places">
                    My places
                </NavLink>
                <NavLink to = "/places/new">
                    Add place
                </NavLink>
                <NavLink to = "/auth">
                    Login
                </NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;