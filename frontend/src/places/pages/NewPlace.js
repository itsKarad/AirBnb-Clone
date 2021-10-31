import React, {useCallback, useReducer} from 'react';
import { useHistory } from 'react-router';
import useHttp from '../../hooks/use-http';
import ErrorModal from '../../shared/components/ErrorModal';
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
    const history = useHistory();
    const {isLoading, error, sendRequest, resetError} = useHttp();
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
        try{
            const data = await sendRequest({
                url: "http://localhost:5000/api/places",
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: {
                    title: formIsValidState.inputs.title.value,
                    description: formIsValidState.inputs.description.value,
                    address:formIsValidState.inputs.address.value,
                }
            });            
            console.log(data);
            history.push(`/`);
        } 
        catch(err){
            console.log(err);
        } 
    }
    return (
        <div className = "add-place-container container">
            <div className = "add-place-header">
                Add your place
            </div>
            <ErrorModal 
                error = {error}
                onClear = {resetError}
                >

            </ErrorModal>
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
            {isLoading && <p>Loading...</p>}
        </div>
    );
};

export default NewPlace;    