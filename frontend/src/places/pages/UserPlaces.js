import React, {useEffect, useState} from 'react';
import Card from '../../UI/Card';
import useHttp from '../../hooks/use-http';
import PlaceList from '../components/Placelist';
import { useParams } from 'react-router';
import './UserPlaces.css';


const UserPlaces = (props) => {
    const userId = useParams().userId;
    const [places, setPlaces] = useState(null);
    const { isLoading, sendRequest, error, resetError } = useHttp();
    useEffect(() => {
        const fetchPlaces = async () => {
            try{
                const data = await sendRequest({
                    url: `http://localhost:5000/api/places/user/${userId}`
                });
                //console.log(data);
                setPlaces(data.places);
            }
            catch(err){
                console.log(err);
            }            
        }
        fetchPlaces();
    }, [sendRequest]);
    const deletePlaceHandler = (deletedPlaceId) => {
        setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
    };
    return (
        <div className = "user-places-container">
            <div className = "places-header">
                Your places
            </div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && 
                <Card>
                    <PlaceList places = {places} onDelete = {deletePlaceHandler}></PlaceList>
                </Card>
            }
        </div>
        
        
    );

};

export default UserPlaces;