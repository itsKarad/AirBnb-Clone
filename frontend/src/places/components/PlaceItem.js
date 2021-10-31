import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../shared/context/auth-context';
import Map from '../../UI/Map';
import Modal from '../../UI/Modal';
import Prompt from '../../UI/Prompt';
import './PlaceItem.css'
import useHttp from '../../hooks/use-http';

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
                url: `http://localhost:5000/api/place/${props.place.id}`,
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json"
                },
            });
            console.log(response);
            props.onDelete(props.place.id);
        } catch{

        }              
    }
    console.log(props.place);

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
            <div className = "place-container col-sm-12 col-md-6">
                <div className = "place-item">
                    <div className = "place-image-container" style = {{
                        backgroundImage : `linear-gradient(to bottom, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.64)),url('${props.place.image}')`                   
                    }}>
                        {props.place.title}
                    </div>
                    <div className = "place-info">
                        <div className = "place-address">
                            Location: {props.place.address}
                        </div>
                        
                        <div className = "place-description">
                            {props.place.description}
                            {isLoading && <p>Deleting... </p>}
                        </div>

                        <div className = "place-actions">
                            <div className = "place-action">
                                <button onClick = {openMapHandler} className = "btn btn-primary">View on Google Maps</button>                     
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
                                    <button onClick = {openPromptHandler} className = "btn btn-danger">Delete</button>                     
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