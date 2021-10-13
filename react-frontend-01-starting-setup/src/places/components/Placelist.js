import React from 'react';
import PlaceItem from './PlaceItem';

const PlaceList = (props) => {
    let placesContent;
    if(!props || !props.places || !props.places.length === 0){
        placesContent = (
            <div>
                <h2>No places found! Maybe create one?</h2>
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