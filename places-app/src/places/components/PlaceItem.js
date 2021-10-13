import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../UI/Modal';
import './PlaceItem.css'
const PlaceItem = (props) => {
    const [showMap, setShowMap] = useState(false);
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    return (
        <React.Fragment>
            <Modal 
                show = {showMap} 
                onCancel = {closeMapHandler}
                header = {props.place.title}                
                footer = {<button onClick = {closeMapHandler}>Close</button>}>      
                <div className = "map-container">
                    <div className = "place-address">
                        {props.place.address}
                    </div>
                    <h1>Google maps overlay for this place!</h1>
                </div>           
                
            </Modal>
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
                                <Link to = {`/places/${props.place.id}`}>
                                    <button className = "btn btn-warning">Edit</button>
                                </Link>
                                
                            </div>
                            <div className = "place-action">
                                <Link to = {`/places/${props.place.id}`}>
                                    <button className = "btn btn-danger">Delete</button>
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