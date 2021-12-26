import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../shared/context/auth-context';
import Map from '../../UI/Map';
import Modal from '../../UI/Modal';
import Prompt from '../../UI/Prompt';
import './PlaceItem.css'
import useHttp from '../../hooks/use-http';
import {LoadingBlack, LoadingWhite} from '../../UI/Loading';
import {FiMap} from 'react-icons/fi';

const PlaceItem = (props) => {
    const authCtx = useContext(AuthContext);
    const {isLoading, sendRequest} = useHttp();
    const [showMap, setShowMap] = useState(false);
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);
    const brokenImageHandler = (e) => {
        e.target.src = "https://i.imgur.com/BXkBZnn.png"
    }
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
            
                <div className = "place-container col-sm-12 col-lg-6">
                    <div className = "place-item">
                    <Link to = {`/place/${props.place.id}`} className='place-card'>
                        <div className = "place-image-container" >
                            <img onError={brokenImageHandler} alt = "Place pic" src = {imageLink} className = "place-image"></img>
                        </div>
                        <div className = "place-title">
                            {props.place.title}
                        </div>
                    </Link>
                                            
                    <div className = "place-info">
                        <div className='place-price'>
                            ₹{props.place.price} / night
                        </div>
                        <div className = "place-address">
                            {props.place.address}
                        </div>
                        <div className = "place-details">
                            {props.place.numberOfBedrooms} bedrooms, {props.place.numberOfBeds} beds.
                        </div>
                    </div>
                    <div className='place-actions'>
                        <button onClick={openMapHandler} className='btn btn-primary map-button'>
                            <FiMap></FiMap>
                        </button>
                        <Link to = {`/place/${props.place.id}`} className='btn btn-primary'>
                            More
                        </Link>
                    </div>
                    </div>           
                </div>
            
        </React.Fragment>
        
    );

};

export default PlaceItem;