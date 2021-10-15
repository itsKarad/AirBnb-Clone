import React from 'react';
import { Link } from 'react-router-dom';
import PlaceItem from './PlaceItem';

import './Placelist.css';

const PlaceList = (props) => {
    let placesContent;
    if(!props || !props.places || props.places.length === 0){
        placesContent = (
            <div className = "no-places-container">
                <h2 className = "mb-5">No places found! Maybe create one?</h2>
                <Link to = "/places/new">
                    <button className = "btn btn-primary">Create yours</button>
                </Link>                
            </div>
        );
    }
    else{
        placesContent = props.places.map((place) => {
            return <PlaceItem key = {place.id} place = {place}></PlaceItem>
        });
    }
    return (
        <div className = "places-container row">
            {placesContent}
        </div>
    );

};

export default PlaceList;