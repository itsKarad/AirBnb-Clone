import React, { useState, useEffect } from 'react';
import Card from '../../UI/Card';
import { LoadingWhite } from '../../UI/Loading';
import PlaceList from '../components/Placelist';
import useHttp from '../../hooks/use-http';
import './Places.css';

const Places = (props) => {
    const [places, setPlaces] = useState([]);
    const { isLoading, sendRequest, error } = useHttp();
    useEffect(() => {
        const fetchPlaces = async() => {
            try{
                const data = await sendRequest({
                    url: `${process.env.REACT_APP_BACKEND_URL}/api/places`
                });
                console.log(data);
                setPlaces(data.places);
            } catch(err){
                console.log(err);
            }
        }
        fetchPlaces();
    }, [sendRequest])
    return (
        <div className = "user-places-container">
            <div className = "places-header">
                Places
            </div>
            <Card>
                {isLoading && <div className = "error-container"><LoadingWhite></LoadingWhite></div>}
                {!isLoading && 
                    <PlaceList showCreator = {true} places = {places} onDelete = {()=>{}}></PlaceList>
                }
            </Card>           
        </div> 
    );
};

export default Places;