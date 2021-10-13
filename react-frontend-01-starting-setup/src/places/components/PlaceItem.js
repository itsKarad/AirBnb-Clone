import React from 'react';
import './PlaceItem.css'
const PlaceItem = (props) => {
    return (
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
                            <button className = "btn btn-primary">View on Google Maps</button>
                        </div>
                        <div className = "place-action">
                            <button className = "btn btn-warning">Edit</button>
                        </div>
                        <div className = "place-action">
                            <button className = "btn btn-danger">Delete</button>
                        </div>                        
                    </div>
                </div>
            </div>
            
            
        </div>
    );

};

export default PlaceItem;