import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { LoadingWhite } from '../../UI/Loading';
import PlaceFullView from '../components/PlaceFullView';
import PlaceItem from '../components/PlaceItem';

const DEFAULT_PLACE = {
    title: "",
    description: "",
    address: "",
    image: "",
    creator: {
        name: "",
        image: "",
        id: "",
    },
    amenities: {
        
    }
}
const Place = (props) => {
    const placeId = useParams().placeId;
    const [place, setPlace] = useState(DEFAULT_PLACE);
    const {isLoading, error, sendRequest} = useHttp();

    useEffect(() => {
        const fetchPlace = async() => {
            const data = await sendRequest({
                url: `${process.env.REACT_APP_BACKEND_URL}/api/place/${placeId}`
            });
            setPlace(data.place);
        };
        fetchPlace();
    }, []);
    return (
        <div className="container">
            {
                isLoading &&
                <LoadingWhite></LoadingWhite>
            }
            {
                !isLoading && 
                <PlaceFullView place = {place}>

                </PlaceFullView>
            }
        </div>
    )
};

export default Place;