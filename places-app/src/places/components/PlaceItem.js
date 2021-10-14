import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Map from '../../UI/Map';
import Modal from '../../UI/Modal';
import Prompt from '../../UI/Prompt';
import './PlaceItem.css'
const PlaceItem = (props) => {
    const [showMap, setShowMap] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);
    const openPromptHandler = () => setShowPrompt(true);
    const closePromptHandler = () => setShowPrompt(false);
    const deletePlaceHandler = () => {
        console.log("Deleting place!");
        closePromptHandler();
        // Send request to backend
    }
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
                        backgroundImage : `linear-gradient(to bottom, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.84)),url(${props.place.image})`                   
                    }}>
                        {props.place.title}
                    </div>
                    <div className = "place-info">
                        <div className = "place-address">
                            {props.place.address}
                        </div>
                        <div className = "place-description">
                            {props.place.description}
                        </div>
                        <div className = "place-actions">
                            <div className = "place-action">
                                
                                <button onClick = {openMapHandler} className = "btn btn-primary">View on Google Maps</button>
                                                           
                            </div>
                            <div className = "place-action">
                                <Link to = {`/place/${props.place.id}`}>
                                    <button className = "btn btn-warning">Edit</button>
                                </Link>
                                
                            </div>
                            <div className = "place-action">
                                <Link>
                                    <button onClick = {openPromptHandler} className = "btn btn-danger">Delete</button>
                                </Link>                            
                            </div>                        
                        </div>
                    </div>
                </div>           
            </div>
        </React.Fragment>
        
    );

};

export default PlaceItem;