import React, {useCallback, useReducer, useContext, useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router';
import AuthContext from '../../shared/context/auth-context';
import Input from '../../UI/Input';
import useHttp from '../../hooks/use-http';
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
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const [place, setPlace] = useState(null);  
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
    const formSubmitHandler = async(event) => {
        console.log(authCtx);
        event.preventDefault();
        console.log(formIsValidState.inputs);
        try{
            await sendRequest({
                url: `http://localhost:5000/api/place/${placeId}`,
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authCtx.token
                },
                body: JSON.stringify({
                    title: formIsValidState.inputs.title.value,
                    description: formIsValidState.inputs.description.value,
                    address:formIsValidState.inputs.address.value,
                })
            });
            history.push(`/${place.creator}/places`);
            //console.log(response);
        } catch(err){
            console.log(err);
        }
        
    }

    const placeId = useParams().placeId;
    const {isLoading, sendRequest } = useHttp();
        
    useEffect(() => {
        const fetchPlace = async() => {
            try{
                const response = await sendRequest({
                    url: `http://localhost:5000/api/place/${placeId}`
                });
                setPlace(response.place);
            } catch(err){
                console.log(err);
            }
        }
        fetchPlace();
    }, [sendRequest, placeId]);
    if(!place && !isLoading){
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
            {isLoading &&
                <div>
                    Loading...
                </div>            
            }
            {!isLoading && place &&
            
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
            }
        </div>
        
        
    );
};

export default UpdatePlace;