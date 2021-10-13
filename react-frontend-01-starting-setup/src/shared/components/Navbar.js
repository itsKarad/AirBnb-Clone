import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="navbar-brand">
                    Your Places App
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    
                </ul>
                <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className = "nav-link" to = "/users">All users</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className = "nav-link" to = "/u1/places">My Places</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className = "nav-link" to = "/places/new">Add a place</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className = "nav-link" to = "/login">Login</NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;