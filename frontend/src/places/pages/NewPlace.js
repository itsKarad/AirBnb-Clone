import React, {useCallback, useReducer, useContext} from 'react';
import { useHistory } from 'react-router';
import useHttp from '../../hooks/use-http';
import ErrorModal from '../../shared/components/ErrorModal';
import AuthContext from '../../shared/context/auth-context';
import CheckBox from '../../UI/CheckBox';
import ImageUpload from '../../UI/ImageUpload';
import Input from '../../UI/Input';
import { LoadingBlack } from '../../UI/Loading';
import './NewPlace.css';

const formReducer = (state, action) => {
    if(action.type === "INPUT_CHANGE"){
        console.log(state);
        console.log(action);
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
    const authCtx = useContext(AuthContext);
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
        isValid:true,
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
        console.log(authCtx);
        //console.log(formIsValidState.inputs);
        try{
            const formData = new FormData();
            formData.append("title", formIsValidState.inputs.title.value);
            formData.append("description", formIsValidState.inputs.description.value);
            formData.append("address", formIsValidState.inputs.address.value);
            formData.append("image", formIsValidState.inputs.photo.value);
            formData.append("creator", authCtx.userId);
            formData.append("price", formIsValidState.inputs.price.value);
            formData.append("numberOfBedrooms", formIsValidState.inputs.numberOfBedrooms.value);
            formData.append("numberOfBeds", formIsValidState.inputs.numberOfBeds.value);
            formData.append("hasWifi", formIsValidState.inputs.hasWifi.value);
            formData.append("hasParking", formIsValidState.inputs.hasParking.value);
            formData.append("hasPool", formIsValidState.inputs.hasPool.value);
            formData.append("hasDining", formIsValidState.inputs.hasDining.value);
            formData.append("hasPetsAllowed", formIsValidState.inputs.hasPetsAllowed.value);
            formData.append("hasEssentials", formIsValidState.inputs.hasEssentials.value);
            formData.append("hasAirConditioning", formIsValidState.inputs.hasAirConditioning.value);
            formData.append("hasTV", formIsValidState.inputs.hasTV.value);
            formData.append("hasKitchen", formIsValidState.inputs.hasKitchen.value);
            console.log(formData);
            const data = await sendRequest({
                url: `${process.env.REACT_APP_BACKEND_URL}/api/places`,
                method: "POST",
                body: formData,
                headers: {
                    Authorization: "Bearer " + authCtx.token
                },
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
                    <ImageUpload
                        id = "photo"
                        label = "Photo"
                        onInput = {inputChangeHandler}                    
                    ></ImageUpload>
                    <Input 
                        id = "price"
                        type = "number" 
                        element = "input" 
                        label = "Price (in ₹)"
                        placeholder = "2000"
                        errorText = "Price cannot be negative or empty!"
                        onInput = {inputChangeHandler}
                        ></Input>
                    <Input 
                        id = "numberOfBedrooms"
                        type = "number" 
                        element = "input" 
                        label = "Number of bedrooms at your place"
                        placeholder = "1"
                        errorText = "Number of bedrooms cannot be negative or empty!"
                        onInput = {inputChangeHandler}
                        ></Input>
                    <Input 
                        id = "numberOfBeds"
                        type = "number" 
                        element = "input" 
                        label = "Number of beds at your place"
                        placeholder = "2"
                        errorText = "Number of beds cannot be negative or empty!"
                        onInput = {inputChangeHandler}
                        ></Input>
                    <CheckBox 
                        id = "hasWifi"
                        label = "Does your place have WiFi?"
                        onInput = {inputChangeHandler}
                    ></CheckBox>
                    <CheckBox 
                        id = "hasParking"
                        label = "Does your place have Parking space?"
                        onInput = {inputChangeHandler}
                    ></CheckBox>
                    <CheckBox 
                        id = "hasPool"
                        label = "Does your place have a swimming pool?"
                        onInput = {inputChangeHandler}
                    ></CheckBox>
                    <CheckBox 
                        id = "hasDining"
                        label = "Does your place have dining facilities?"
                        onInput = {inputChangeHandler}
                    ></CheckBox>
                    <CheckBox 
                        id = "hasPetsAllowed"
                        label = "Do you allow pets?"
                        onInput = {inputChangeHandler}
                    ></CheckBox>
                    <CheckBox 
                        id = "hasEssentials"
                        label = "Does your place have essential utilities?"
                        onInput = {inputChangeHandler}
                    ></CheckBox>
                    <CheckBox 
                        id = "hasAirConditioning"
                        label = "Does your place have air conditioning?"
                        onInput = {inputChangeHandler}
                    ></CheckBox>
                    <CheckBox 
                        id = "hasTV"
                        label = "Does your place have television?"
                        onInput = {inputChangeHandler}
                    ></CheckBox>
                    <CheckBox 
                        id = "hasKitchen"
                        label = "Does your place have a kitchen?"
                        onInput = {inputChangeHandler}
                    ></CheckBox>
                    <button disabled = {!formIsValidState.isValid} onClick = {formSubmitHandler} className = "btn btn-primary">
                        {!isLoading && "Submit"}
                        {isLoading && <LoadingBlack />}
                    </button>
                </form>
            </div>
            {isLoading && <p>Loading...</p>}
        </div>
    );
};

export default NewPlace;    