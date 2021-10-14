import React, {useCallback, useReducer} from 'react';
import { useParams } from 'react-router';
import Input from '../../UI/Input';
import { DUMMY_PLACES } from './UserPlaces';
import './NewPlace.css';

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
};

const UpdatePlace = (props) => {    
    const [formIsValidState, dispatch] = useReducer(formReducer, {
        inputs:{
            title:{
                value: "",
                isValid: false,
            },
            description:{
                value: "",
                isValid: false,
            },
            address:{
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

    const placeId = useParams().placeId;
    const place = DUMMY_PLACES.find(p => p.id === placeId);
    if(!place){
        return (
            <div className = "new-place-container container">
                <div className = "new-place-header">
                    Update this place
                </div>
                <div>
                <h3>Could not find that place!</h3>
                </div>
            </div>
        );
    }
    return (
        <div className = "add-place-container container">
            <div className = "add-place-header">
                Update this place
            </div>
            <div className = "add-place-form-container">
                <form className = "add-place-form">
                    <Input 
                        id = "title"
                        type = "text" 
                        element = "input" 
                        label = "Title"
                        errorText = "Title must not be empty!"
                        value = {place.title}
                        onInput = {inputChangeHandler}
                        ></Input>
                    <Input 
                        id = "description"
                        type = "textarea" 
                        element = "textarea" 
                        rows = "5"
                        label = "Description"
                        placeholder = "Goa is a state in western India with coastlines stretching along..."
                        errorText = "Description must not be empty!" 
                        value = {place.description}
                        onInput = {inputChangeHandler}
                        ></Input>
                    <Input 
                        id = "address"
                        type = "text" 
                        element = "input" 
                        label = "Address"
                        errorText = "Address must not be empty!"
                        value = {place.address}
                        onInput = {inputChangeHandler}
                        ></Input>
                    <button disabled = {!formIsValidState.isValid} onClick = {formSubmitHandler} className = "btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        
        
    );
};

export default UpdatePlace;