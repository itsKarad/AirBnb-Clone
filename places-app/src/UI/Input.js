import React, {useReducer, useState, useEffect} from 'react';
import './Input.css';

const CHECK_NOT_EMPTY = (val) => {
    return !(!val || val === "");
}

const inputReducer = (state, action) => {
    if(action.type === "CHANGE"){       
        return {
            ...state,
            value: action.val,
            isValid: CHECK_NOT_EMPTY(action.val),
        }             
    }
    return state;
};

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, { value: props.value ? props.value : "", isValid: props.value? CHECK_NOT_EMPTY(props.value) : false});
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
            <div className = {`form-control ${!inputState.isValid && isTouched? "form-control--invalid" : ""}`}>
                <label for = {props.id}>{props.label}</label>
                <input 
                    id = {props.id} 
                    placeholder = {props.placeholder} 
                    type = {props.type}
                    onChange = {onChangeHandler} 
                    value = {inputState.value}
                    onBlur = {onBlurHandler}
                ></input>
                {!inputState.isValid && isTouched && <p>{props.errorText}</p>}
            </div>
            
        );
    }
    else{
        return (
            <div className = "form-control">
                <label for = {props.id}>{props.label}</label>
                <textarea 
                    id = {props.id} 
                    rows = {props.rows || 3}
                    onChange = {onChangeHandler} 
                    value = {inputState.value}
                ></textarea>
            </div>            
        );
    }
    
};

export default Input;