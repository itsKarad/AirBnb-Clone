import React, {useCallback, useReducer} from 'react';
import Input from '../../UI/Input';
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

const NewPlace = (props) => {
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
    const formSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(formIsValidState.inputs);
        const title = formIsValidState.inputs.title.value;
        const description = formIsValidState.inputs.description.value;
        const address = formIsValidState.inputs.address.value;
        const formInputs = {
            title,
            description,
            address,
        }
        console.log(formInputs);
        // send POST request to localhost:5000/places/
        // with formInputs
        const response = await fetch('http://localhost:5000/api/places', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formInputs),
        });
        console.log(response);
        // Send this to backend
    }
    return (
        <div className = "add-place-container container">
            <div className = "add-place-header">
                Add your place
            </div>
            <div className = "add-place-form-container">
                <form className = "add-place-form">
                    <Input 
                        id = "title"
                        type = "text" 
                        element = "input" 
                        label = "Title"
                        errorText = "Title must not be empty!"
                        placeholder = "Goa"
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
                        onInput = {inputChangeHandler}
                        ></Input>
                    <Input 
                        id = "address"
                        type = "text" 
                        element = "input" 
                        label = "Address"
                        placeholder = "Goa, below Maharashtra, India"
                        errorText = "Address must not be empty!"
                        onInput = {inputChangeHandler}
                        ></Input>
                    <button disabled = {!formIsValidState.isValid} onClick = {formSubmitHandler} className = "btn btn-primary">Submit</button>
                </form>
            </div>

        </div>
    );
};

export default NewPlace;    