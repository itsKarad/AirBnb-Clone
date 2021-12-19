import React, {useContext} from 'react';
import { NavLink, Link } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import Brand from './Brand';
import './Navbar.css';
const Navbar = (props) => {
    const authCtx = useContext(AuthContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to = "/">
                    <Brand></Brand>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className = "nav-link" to = "/about" >About</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className = "nav-link" to = "/users">All users</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className = "nav-link" to = "/places">All places</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className = "nav-link" to = "/explore">Explore!</NavLink>
                        </li>
                        {
                            authCtx.isLoggedIn &&
                            <li className="nav-item">
                                <NavLink className = "nav-link" to = {`/user/${authCtx.userId}/places`} >My Places</NavLink>
                            </li>
                        }
                        <li className="nav-item">
                            <NavLink className = "nav-link" to = "/places/new">Add a place</NavLink>
                        </li>
                        {
                            !authCtx.isLoggedIn && 
                            <li className="nav-item">
                                <NavLink className = "nav-link" to = "/sign-in">Sign In</NavLink>
                            </li>
                        }
                        {
                            !authCtx.isLoggedIn && 
                            <li className="nav-item">
                                <NavLink className = "nav-link" to = "/sign-up">Sign Up</NavLink>
                            </li>
                        }
                        {
                            authCtx.isLoggedIn && 
                            <li className="nav-item">
                                <NavLink className = "nav-link" to = "/logout" onClick = {authCtx.logout}>Log out</NavLink>
                            </li>
                        }
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;