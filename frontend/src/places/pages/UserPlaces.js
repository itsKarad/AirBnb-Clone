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
    const [user, setUser] = useState(null);
    const { isLoading, sendRequest, error } = useHttp();
    useEffect(() => {
        const fetchPlaces = async () => {
            try{
                const data = await sendRequest({
                    url: `${process.env.REACT_APP_BACKEND_URL}/api/places/user/${userId}`
                });
                console.log(data.user);

                setPlaces(data.places);
                setUser(data.user);
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
                {!isLoading && 
                    <div>
                        {authCtx.isLoggedIn && authCtx.userId === userId && "Your places"}
                        {authCtx.isLoggedIn && authCtx.userId !== userId && user && `${user.name}'s Places`}
                        {!authCtx.isLoggedIn && user && `${user.name}'s Places`}
                        {!user && "Places"}
                    </div>
                }
                {
                    isLoading && "Places"
                }
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