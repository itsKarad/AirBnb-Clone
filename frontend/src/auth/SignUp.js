import React, {useCallback, useContext, useReducer} from 'react';
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
    const formSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formIsValidState.inputs);
        authCtx.login();
        // Send this to backend
    }
    return (
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
            </form>    
        </div>
    );
};

export default SignUp;