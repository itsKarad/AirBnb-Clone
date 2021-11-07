import React, {useCallback, useContext, useReducer} from 'react';
import { Link } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import AuthContext from '../shared/context/auth-context';
import Input from '../UI/Input';
import ErrorModal from '../shared/components/ErrorModal';
import LoadingSpinner from '../shared/components/LoadingSpinner';
import './Auth.css';
import { LoadingBlack } from '../UI/Loading';

const formReducer = (state, action) => {
    if(action.type === "INPUT_CHANGE"){
        let formIsValid = true;
        for(const inputId in state.inputs){
            if(inputId === action.inputId){
                formIsValid = formIsValid && action.isValid;
            }
            else {
                formIsValid = formIsValid && state.inputs[inputId].isValid;
            }
        }
        return {
            ...state,
            inputs:{
                ...state.inputs,
                [action.inputId] : {value: action.value, isValid: action.isValid}
            },
            isValid: formIsValid,
        };
    }
    return state;
}

const SignIn = (props) => {
    const {isLoading, error, sendRequest, resetError} = useHttp();
    const authCtx = useContext(AuthContext);
    const [formIsValidState, dispatch] = useReducer(formReducer, {
        inputs:{
            email:{
                value: "",
                isValid: false,
            },
            password:{
                value: "",
                isValid: false,
            },
        },
        isValid:false,
    });
    const inputChangeHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: "INPUT_CHANGE",
            inputId : id,
            isValid: isValid,
            value: value, 
        })
    }, []);
    const formSubmitHandler = async(event) => {
        
        event.preventDefault();
        console.log(formIsValidState.inputs.email.value, formIsValidState.inputs.password.value);
        try{
            const data = await sendRequest({
                url: `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formIsValidState.inputs.email.value,
                    password:formIsValidState.inputs.password.value,
                })
            });
            authCtx.login(data.userId, data.token);

        } 
        catch(err){
            console.log(err);
        }   
    }
    return (
        <div className = "auth-container conatiner">
            <div className = "auth-header">
                Sign In
            </div>          
            <ErrorModal 
                error = {error}
                onClear = {resetError}
                >   
            </ErrorModal>
            <div className = "auth-form-container">
                <form>
                    <Input 
                        element = "input" 
                        id = "email" 
                        type = "email" 
                        label = "E-mail"
                        className = "form-control"
                        errorText = "Please provide a valid email."
                        onInput = {inputChangeHandler}
                    ></Input>
                    <Input 
                        element = "input" 
                        id = "password" 
                        type = "password" 
                        label = "Password"
                        className = "form-control"
                        errorText = "Password must be more than 6 characters."
                        onInput = {inputChangeHandler}
                    ></Input>

                    <button onClick = {formSubmitHandler} disabled = {!formIsValidState.isValid} className = "btn btn-primary">
                        {!isLoading && "Sign In"}
                        {isLoading && <LoadingBlack />}
                    </button>
                </form>  
                <div className = "auth-form-footer mb-3">
                    <p>Don't have an account?</p>
                    <Link class = "btn btn-outline-primary" to = "/sign-up">Switch to Sign-up</Link>
                </div>
                
                {/* <button onClick = {switchModeHandler} className = "btn btn-outline-warning">Switch to {showLogin? "Sign-up" : "Sign In"}?</button> */}
                {/* {isLoading && <LoadingSpinner asOverlay = "true"></LoadingSpinner>} */}
                <p>{error}</p>
            </div>
        </div>
    );
};

export default SignIn;