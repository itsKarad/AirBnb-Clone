import React, {useCallback, useContext, useReducer} from 'react';
import { Link } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import ErrorModal from '../shared/components/ErrorModal';
import LoadingSpinner from '../shared/components/LoadingSpinner';
import AuthContext from '../shared/context/auth-context';
import Input from '../UI/Input';
import './Auth.css';

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

const SignUp = (props) => {
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
            name:{
                value: "",
                isValid: false,
            }
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
        console.log(formIsValidState.inputs.name.value, formIsValidState.inputs.email.value, formIsValidState.inputs.password.value)
        try{
            await sendRequest({
                url: "http://localhost:5000/api/users/signup",
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: {
                    name: formIsValidState.inputs.name.value,
                    email: formIsValidState.inputs.email.value,
                    password:formIsValidState.inputs.password.value,
                }
            });
            authCtx.login();
        } 
        catch(err){
            console.log(err);
        }       
    }
    return (
        <div className = "auth-container conatiner">
            <div className = "auth-header">
                Sign Up
                
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
                        errorText = "Please provide a valid email."
                        onInput = {inputChangeHandler}
                    ></Input>
                    <Input 
                        element = "input" 
                        id = "name" 
                        type = "text" 
                        label = "Your name"
                        errorText = "Name cannot be empty!"
                        onInput = {inputChangeHandler}
                    ></Input>
                    <Input 
                        element = "input" 
                        id = "password" 
                        type = "password" 
                        label = "Password"
                        errorText = "Password must be more than 6 characters."
                        onInput = {inputChangeHandler}
                    ></Input>
                    <button onClick = {formSubmitHandler} disabled = {!formIsValidState.isValid} className = "btn btn-primary">Sign up!</button>
                    {isLoading && <LoadingSpinner asOverlay = "true"></LoadingSpinner>}
                    <p>{error}</p>
                </form>    
                <div className = "auth-form-footer">
                    <p>Already have an account?</p>
                    <Link class = "btn btn-outline-primary" to = "/sign-in">Switch to Sign-in</Link>
                </div>
            </div>
            
        </div>        
    );
};

export default SignUp;