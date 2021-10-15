import React, {useReducer, useState, useEffect} from 'react';
import './Input.css';

const CHECK_NOT_EMPTY = (val) => {
    return !(!val || val === "");
}
const CHECK_EMAIL = (val) => {
    return !(!val || val === "" || !val.includes("@"));
}
const CHECK_PASSWORD = (val) => {
    return !(!val || val === "" || val.length <= 6 );
}
const validate = (val, type) => {
    if(type === "email"){
        return CHECK_EMAIL(val);
    }
    else if(type === "password"){
        return CHECK_PASSWORD(val);
    }
    return CHECK_NOT_EMPTY(val);
}

const inputReducer = (state, action) => {
    if(action.type === "CHANGE"){       
        return {
            ...state,
            value: action.val,
            isValid: validate(action.val, state.inputType),
        }             
    }
    return state;
};

const Input = (props) => {
    
    const [inputState, dispatch] = useReducer(inputReducer, { inputType: props.type, value: props.value ? props.value : "", isValid: props.value? validate(props.value, props.type) : false});
    const [isTouched, setIsTouched] = useState(false);
    const onChangeHandler = (event) => {
        dispatch({type: "CHANGE", val:event.target.value });
        setIsTouched(true);
    };
    const onBlurHandler = (event) => {
        setIsTouched(true);
    }

    const {id, onInput} = props;
    const {value, isValid} = inputState;

    useEffect(() => {
        props.onInput(props.id, inputState.value, inputState.isValid)
    }, [id, onInput, value, isValid]);
    
    if(props.element === "input"){
        return (
            <div className = {`form form-group ${!inputState.isValid && isTouched? "form--invalid" : ""}`}>
                <label for = {props.id}>{props.label}</label>
                <input 
                    id = {props.id} 
                    placeholder = {props.placeholder} 
                    type = {props.type}
                    onChange = {onChangeHandler} 
                    className = "form-control"
                    value = {inputState.value}
                    onBlur = {onBlurHandler}
                ></input>
                {!inputState.isValid && isTouched && <p>{props.errorText}</p>}
            </div>
            
        );
    }
    else{
        
        return (
            <div className = {`form form-group ${!inputState.isValid && isTouched? "form--invalid" : ""}`}>
                <label for = {props.id}>{props.label}</label>
                <textarea 
                    id = {props.id} 
                    rows = {props.rows || 3}
                    onChange = {onChangeHandler} 
                    value = {inputState.value}
                    className = "form-control"
                    placeholder = {props.placeholder}
                    onBlur = {onBlurHandler}
                ></textarea>
                {!inputState.isValid && isTouched && <p>{props.errorText}</p>}
            </div>            
        );
    }
    
};

export default Input;