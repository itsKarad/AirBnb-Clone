import React, {useState, useContext, useEffect} from 'react';
import styles from './PlaceBooking.module.css';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    useToast,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import AuthContext from '../shared/context/auth-context';
import useHttp from '../hooks/use-http';
import {LoadingBlack, LoadingWhite} from '../UI/Loading';
import { useHistory } from 'react-router-dom';

const TODAY = new Date();
const TOMORROW = new Date();
TOMORROW.setDate(TOMORROW.getDate() + 1);

const differenceBetweenDates = (d1, d2) => {
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays; 
}

const INITIAL_SELECTION = {
    startDate: TODAY,
    endDate: TOMORROW,
    key: "selection"
};

const beautifulDate = (date) => {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
  
    return [
        (dd>9 ? '' : '0') + dd,
        (mm>9 ? '' : '0') + mm,
        date.getFullYear(),
        ].join('-');
};

const PlaceBooking = (props) => {
    
    const history = useHistory();
    const {sendRequest, isLoading, error} = useHttp();
    const authCtx = useContext(AuthContext);
    const [selection, setSelection] = useState(INITIAL_SELECTION);
    const toast = useToast()

    const dateRangeChangeHandler = (item) => {
        console.log(item.selection);
        // if(item.selection.endDate === item.selection.startDate){
        //     item.selection.endDate.setDate(item.selection.startDate.getDate() + 1);
        // }
        setSelection(item.selection);
    };
    

    const bookingHandler = async (event) => {
        event.preventDefault();
        const placeId = props.place.id;
        const price = props.place.price*differenceBetweenDates(selection.startDate, selection.endDate);
        const startDate = selection.startDate;
        const endDate = selection.endDate;
        const ownerId = props.place.creator.id;
        const customerId = authCtx.userId;
        console.log(price, startDate, endDate, ownerId, customerId, placeId);
        let bookingId = null;
        // store this booking attempt in database
        try{
            if(startDate === endDate){
                throw new Error("Choose a valid date range");
            }
            const data = await sendRequest({
                url: `${process.env.REACT_APP_BACKEND_URL}/api/book-place`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authCtx.token
                },
                body: JSON.stringify({
                    placeId,
                    customerId,
                    ownerId,
                    bookingStart: startDate,
                    bookingEnd: endDate,
                    price,
                }),

            });            
            console.log(data);
            if(data.booking){
                bookingId = data.booking.id;
                toast({
                    title: "Booking added!",
                    description: "Your booking was successfully added.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            }
            else{
                toast({
                    title: "Booking not added!",
                    description: "Your booking was not added.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        } catch(err){
            console.log(err);
            toast({
                title: "Booking not added!",
                description: "Your booking was not added.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
        if(!bookingId){
            return;
        }
        try{
            const data = await sendRequest({
                url: `${process.env.REACT_APP_BACKEND_URL}/api/create-checkout-session`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authCtx.token,
                },
                body: JSON.stringify({
                    bookingId: bookingId
                }),
            });
            const stripe_url = data.stripeURL;
            console.log(stripe_url);
            window.location.href = stripe_url;

        }
        catch(err){
            console.log(err);
        }   
    }

    return (
        
        <div className = {styles["booking-container"]}>
            <DateRangePicker 
                className = {styles["booking-form"]}
                ranges = {[selection]}
                onChange={dateRangeChangeHandler}
                moveRangeOnFirstSelection={false}
                showSelectionPreview = {true}
                minDate={new Date()}
            ></DateRangePicker>
            <div className={styles["booking-dates"]}>
                <div className={styles["start-date"]}>
                    {beautifulDate(selection.startDate)}
                </div>
                →
                <div className={styles["end-date"]}>
                    {beautifulDate(selection.endDate)}
                </div>
            </div>
            {
                selection.startDate === selection.endDate && 
                <div className={styles["error"]}>
                        Start date and End date cannot be the same!
                </div>
            }
            
            <div className={styles["booking-calculation"]}>
                <Table variant='simple' className={styles["table"]}>
                    <TableCaption>COST CALCULATION</TableCaption>
                    <Thead>
                        <Tr>
                        <Th>Price per night (in ₹)</Th>
                        <Th>Nights</Th>
                        <Th isNumeric>Total (in ₹)</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>₹ {props.place.price}</Td>
                            <Td>{differenceBetweenDates(selection.startDate, selection.endDate)} nights</Td>
                            <Td isNumeric>₹ {props.place.price*differenceBetweenDates(selection.startDate, selection.endDate)}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </div>
            <div className={styles["booking-actions"]}>
                <button onClick = {bookingHandler} className='btn btn-primary'>
                    {!isLoading && "Book"}
                    {isLoading && 
                        <LoadingBlack></LoadingBlack>
                    }
                </button>
            </div>
        </div>
    )

};

export default PlaceBooking;