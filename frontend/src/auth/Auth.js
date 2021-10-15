import React, {useState, useReducer, useCallback} from 'react';
import Card from '../UI/Card';
import Input from '../UI/Input';
import './Auth.css';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Auth = (props) => {
    const [showLogin, setShowLogin] = useState(true);
    
    const switchModeHandler = (event) => {
        event.preventDefault();
        const mode = showLogin;
        setShowLogin(!mode);
    }
    return (
        <div className = "auth-container conatiner">
            <div className = "auth-header">
                {showLogin && "Sign In"}
                {!showLogin && "Sign up"}
            </div>
            {showLogin && <SignIn></SignIn>}
            {!showLogin && <SignUp></SignUp>}
            <div className = "auth-form-container">
                <button onClick = {switchModeHandler} className = "btn btn-outline-warning">Switch to {showLogin? "Sign-up" : "Sign In"}?</button>
            </div>
        </div>
    )
};

export default Auth;