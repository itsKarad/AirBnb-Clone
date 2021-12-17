import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../shared/context/auth-context';
import Map from '../../UI/Map';
import Modal from '../../UI/Modal';
import Prompt from '../../UI/Prompt';
import './PlaceItem.css'
import useHttp from '../../hooks/use-http';
import {LoadingBlack, LoadingWhite} from '../../UI/Loading';

const PlaceItem = (props) => {
    const authCtx = useContext(AuthContext);
    const {isLoading, sendRequest} = useHttp();
    const [showMap, setShowMap] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);
    const openPromptHandler = (event) => {
        event.preventDefault();
        setShowPrompt(true);
        console.log("HIT");
    }

    const closePromptHandler = () => setShowPrompt(false);
    const deletePlaceHandler = async (event) => {
        event.preventDefault();
        console.log("Deleting place!");
        closePromptHandler();
        try{
            const response = await sendRequest({
                url: `${process.env.REACT_APP_BACKEND_URL}/api/place/${props.place.id}`,
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: "Bearer "+ authCtx.token
                },
            });
            console.log(response);
            props.onDelete(props.place.id);
        } catch{

        }              
    }
    console.log(props.place);
    const imageLink = `${process.env.REACT_APP_BACKEND_URL}/`+props.place.image;
    return (        
        <React.Fragment>
            <Modal 
                show = {showMap} 
                onCancel = {closeMapHandler}
                header = {props.place.title}>      
                <div className = "map-container">
                    <div className = "map-place-address">
                        {props.place.address}
                    </div>
                    <Map center = {props.place.location} zoom = {16}></Map>
                </div>         
            </Modal>
            <Prompt
                show = {showPrompt}
                onCancel = {closePromptHandler}
                header = {`Are you sure you want to delete ${props.place.title}?`}>
                <React.Fragment>
                    <button onClick = {deletePlaceHandler} className = "btn btn-danger">Yes, delete it</button>
                    <button onClick = {closePromptHandler} className = "btn btn-warning">No</button>
                </React.Fragment>

            </Prompt>
            <div className = "place-container col-sm-12 col-lg-6">
                <div className = "place-item">
                    <div className = "place-image-container" >
                        <img alt = "Place pic" src = {imageLink} class = "place-image"></img>
                    </div>
                    <div className = "place-title">
                        {props.place.title}
                    </div>                    
                    <div className = "place-info">
                        <div className = "place-address">
                            <span class = "category-label">Location: </span> {props.place.address}
                        </div>
                        
                        <div className = "place-description">
                        <span class = "category-label">Description: </span>{props.place.description}
                        </div>
                        {props.showCreator? 
                            <div class = "place-creator"> 
                            <Link to={`/${props.place.creator.id}/places`}>
                                <span class = "category-label">Owner: </span> {props.place.creator.name} 
                            </Link>
                                
                            </div> : <div />}

                        <div className = "place-actions">
                            <div className = "place-action">
                                <button onClick = {openMapHandler} className = "btn btn-primary">
                                    View on Google Maps 
                                </button>                     
                            </div> 
                            {
                                authCtx.isLoggedIn && authCtx.userId === props.place.creator &&
                                <div className = "place-action">
                                    <Link to = {`/place/${props.place.id}`} className="btn btn-warning">
                                        Edit
                                    </Link>                                    
                                </div>
                            }
                            {
                                authCtx.isLoggedIn && authCtx.userId === props.place.creator &&
                                <div className = "place-action">                                
                                    <button onClick = {openPromptHandler} className = "btn btn-danger">
                                        {!isLoading && "Delete"}
                                        {isLoading && <LoadingWhite></LoadingWhite>}
                                    </button>                     
                                </div>
                            }                                                                                          
                        </div>
                    </div>
                </div>           
            </div>
        </React.Fragment>
        
    );

};

export default PlaceItem;