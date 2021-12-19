import React, {useCallback, useReducer, useContext, useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router';
import AuthContext from '../../shared/context/auth-context';
import Input from '../../UI/Input';
import useHttp from '../../hooks/use-http';
import './NewPlace.css';
import CheckBox from '../../UI/CheckBox';

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
            photo: {
                value: null,
                isValid: false,
            },
            price: {
                value: null,
                isValid: false,
            },
            numberOfBedrooms: {
                value: null,
                isValid: false,
            },
            numberOfBeds: {
                value: null,
                isValid: false,
            },
            hasWifi: {
                value: false,
                isValid: true,
            },
            hasParking: {
                value: false,
                isValid: true,
            },
            hasPool: {
                value: false,
                isValid: true,
            },
            hasDining: {
                value: false,
                isValid: true,
            },
            hasPetsAllowed: {
                value: false,
                isValid: true,
            },
            hasEssentials: {
                value: false,
                isValid: true,
            },
            hasAirConditioning: {
                value: false,
                isValid: true,
            },
            hasTV: {
                value: false,
                isValid: true,
            },
            hasKitchen: {
                value: false,
                isValid: true,
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
        });
    }, []);
    const formSubmitHandler = async(event) => {
        console.log(authCtx);
        event.preventDefault();
        console.log(formIsValidState.inputs);
        try{
            await sendRequest({
                url: `${process.env.REACT_APP_BACKEND_URL}/api/place/${placeId}`,
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authCtx.token
                },
                body: JSON.stringify({
                    title: formIsValidState.inputs.title.value,
                    description: formIsValidState.inputs.description.value,
                    address:formIsValidState.inputs.address.value,
                    price: formIsValidState.inputs.price.value,
                    numberOfBedrooms: formIsValidState.inputs.numberOfBedrooms.value,
                    numberOfBeds: formIsValidState.inputs.numberOfBeds.value,

                    hasWifi: formIsValidState.inputs.hasWifi.value,
                    hasParking: formIsValidState.inputs.hasParking.value,
                    hasPool: formIsValidState.inputs.hasPool.value,
                    hasDining: formIsValidState.inputs.hasDining.value,
                    hasPetsAllowed: formIsValidState.inputs.hasPetsAllowed.value,
                    hasEssentials: formIsValidState.inputs.hasEssentials.value,
                    hasAirConditioning: formIsValidState.inputs.hasAirConditioning.value,
                    hasTV: formIsValidState.inputs.hasTV.value,
                    hasKitchen: formIsValidState.inputs.hasKitchen.value,

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
                    url: `${process.env.REACT_APP_BACKEND_URL}/api/place/${placeId}`
                });
                console.log(response.place);
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
                        <Input 
                            id = "price"
                            type = "number" 
                            element = "input" 
                            label = "Price (in $)"
                            placeholder = "200"
                            value = {place.price}
                            errorText = "Price cannot be negative or empty!"
                            onInput = {inputChangeHandler}
                            ></Input>
                        <Input 
                            id = "numberOfBedrooms"
                            type = "number" 
                            element = "input" 
                            value = {place.numberOfBedrooms}
                            label = "Number of bedrooms at your place"
                            placeholder = "1"
                            errorText = "Number of bedrooms cannot be negative or empty!"
                            onInput = {inputChangeHandler}
                            ></Input>
                        <Input 
                            id = "numberOfBeds"
                            type = "number" 
                            element = "input" 
                            value = {place.numberOfBeds}
                            label = "Number of beds at your place"
                            placeholder = "2"
                            errorText = "Number of beds cannot be negative or empty!"
                            onInput = {inputChangeHandler}
                            ></Input>
                        <CheckBox 
                            id = "hasWifi"
                            value = {place.amenities.hasWifi}
                            label = "Does your place have WiFi?"
                            onInput = {inputChangeHandler}
                        ></CheckBox>
                        <CheckBox 
                            id = "hasParking"
                            value = {place.amenities.hasParking}
                            label = "Does your place have Parking space?"
                            onInput = {inputChangeHandler}
                        ></CheckBox>
                        <CheckBox 
                            id = "hasPool"
                            value = {place.amenities.hasPool}
                            label = "Does your place have a swimming pool?"
                            onInput = {inputChangeHandler}
                        ></CheckBox>
                        <CheckBox 
                            id = "hasDining"
                            value = {place.amenities.hasDining}
                            label = "Does your place have dining facilities?"
                            onInput = {inputChangeHandler}
                        ></CheckBox>
                        <CheckBox 
                            id = "hasPetsAllowed"
                            value = {place.amenities.hasPetsAllowed}
                            label = "Do you allow pets?"
                            onInput = {inputChangeHandler}
                        ></CheckBox>
                        <CheckBox 
                            id = "hasEssentials"
                            value = {place.amenities.hasEssentials}
                            label = "Does your place have essential utilities?"
                            onInput = {inputChangeHandler}
                        ></CheckBox>
                        <CheckBox 
                            id = "hasAirConditioning"
                            value = {place.amenities.hasAirConditioning}
                            label = "Does your place have air conditioning?"
                            onInput = {inputChangeHandler}
                        ></CheckBox>
                        <CheckBox 
                            id = "hasTV"
                            value = {place.amenities.hasTV}
                            label = "Does your place have television?"
                            onInput = {inputChangeHandler}
                        ></CheckBox>
                        <CheckBox 
                            id = "hasKitchen"
                            value = {place.amenities.hasKitchen}
                            label = "Does your place have a kitchen?"
                            onInput = {inputChangeHandler}
                        ></CheckBox>
                        <button 
                            disabled = {!formIsValidState.isValid} 
                            onClick = {formSubmitHandler} 
                            className = "btn btn-primary"
                        >Submit</button>
                    </form>
                </div>
            }
        </div>
        
        
    );
};

export default UpdatePlace;