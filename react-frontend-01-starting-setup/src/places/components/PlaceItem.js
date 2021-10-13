import React from 'react';
import './PlaceItem.css'
const PlaceItem = (props) => {
    return (
        <div class = "col-sm-12 col-md-6">
            <div className = "place-image">
                <img src = {props.place.image} alt = "Place pic"></img>
            </div>
            <div className = "place-info">
                <h3>{props.place.title}</h3>
                <p>{props.place.description}</p>
                <p>{props.place.address}</p>
            </div>
            
        </div>
    );

};

export default PlaceItem;