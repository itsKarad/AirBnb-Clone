import React from 'react';
import './Input.css';

const Input = (props) => {
    
    if(props.element === "input"){
        return (
            <div className = "form-control">
                <label for = {props.id}>{props.label}</label>
                <input id = {props.id} placeholder = {props.placeholder} type = {props.type}></input>
            </div>
            
        );
    }
    else{
        return (
            <div className = "form-control">
                <label for = {props.id}>{props.label}</label>
                <textarea id = {props.id} rows = {props.rows || 3}></textarea>
            </div>
            
        );
    }
    
};

export default Input;