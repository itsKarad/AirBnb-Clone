import React, {useEffect, useState, useContext} from 'react';
import styles from './MyBookings.module.css';
import useHttp from '../../hooks/use-http';
import AuthContext from '../../shared/context/auth-context';
import { use } from 'marked';
import { LoadingWhite } from '../../UI/Loading';
import BookingTable from '../components/BookingTable';

const INITIAL_BOOKINGS = [
    {
        placeId: {
            id: "",
            title: "",
        },
        id: "",
        price: 0,
        bookingStart: "",
        bookingEnd: "",
        createdAt: "",
    }
]

const MyBookings = (props) => {
    const authCtx = useContext(AuthContext);
    const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
    const {sendRequest, error, isLoading} = useHttp();
    const userId = authCtx.userId;

    useEffect(() => {
        const fetchBookings = async() => {
            try{
                const data = await sendRequest({
                    url: `${process.env.REACT_APP_BACKEND_URL}/api/bookings/${userId}`,
                    headers:{
                        Authorization: "Bearer " + authCtx.token
                    },
                });
                console.log(data.data);
                if(data.bookings){
                    setBookings(data.bookings);
                }
                
            } catch(err){
                console.log(err);
            }
        };
        fetchBookings();
    }, [sendRequest, userId]);


    return (
        <div className='container'>
            <div className = {styles["header"]}>
                My Bookings
            </div>
            {isLoading && <LoadingWhite></LoadingWhite>}
            {!isLoading && <BookingTable bookings = {bookings}></BookingTable>}
        </div>
    );


};

export default MyBookings;