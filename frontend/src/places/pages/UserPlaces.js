import React, {useEffect, useState, useContext} from 'react';
import Card from '../../UI/Card';
import useHttp from '../../hooks/use-http';
import PlaceList from '../components/Placelist';
import { useParams } from 'react-router';
import './UserPlaces.css';
import { LoadingWhite } from '../../UI/Loading';
import AuthContext from '../../shared/context/auth-context';


const UserPlaces = (props) => {
    const authCtx = useContext(AuthContext);
    const userId = useParams().userId;
    const [places, setPlaces] = useState(null);
    const { isLoading, sendRequest, error } = useHttp();
    useEffect(() => {
        const fetchPlaces = async () => {
            try{
                const data = await sendRequest({
                    url: `${process.env.REACT_APP_BACKEND_URL}/api/places/user/${userId}`
                });
                //console.log(data);
                setPlaces(data.places);
            }
            catch(err){
                console.log(err);
            }            
        }
        fetchPlaces();
    }, [sendRequest, userId]);
    const deletePlaceHandler = (deletedPlaceId) => {
        setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
    };
    return (
        <div className = "user-places-container">
            <div className = "places-header">
                {authCtx.isLoggedIn && authCtx.userId !== userId && "Places"}
                {!authCtx.isLoggedIn && "Places"}
                {authCtx.isLoggedIn && authCtx.userId === userId && "Your places"}
            </div>
            <Card>
                {isLoading && <div className = "error-container"><LoadingWhite></LoadingWhite></div>}
                {!isLoading && 
                    <PlaceList places = {places} onDelete = {deletePlaceHandler}></PlaceList>
                }
            </Card>           
        </div>       
    );

};

export default UserPlaces;