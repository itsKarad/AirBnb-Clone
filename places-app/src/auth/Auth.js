import React, {useReducer, useCallback} from 'react';
import Card from '../UI/Card';
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
const Auth = (props) => {
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
    const formSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formIsValidState.inputs);
        // Send this to backend
    }
    return (
        <div className = "auth-container">
            <div className = "auth-header">
                Log In
            </div>
            <div className = "auth-form-container">
                <Card>
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
                            id = "password" 
                            type = "password" 
                            label = "Password"
                            errorText = "Password must be more than 6 characters."
                            onInput = {inputChangeHandler}
                        ></Input>
                    </form>
                </Card>                    
            </div>
            
            
        </div>
    )
};

export default Auth;