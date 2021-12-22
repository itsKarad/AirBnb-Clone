import React, {useState, useEffect} from 'react';
import styles from './PlaceFullView.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import useHttp from '../../hooks/use-http';
import { LoadingWhite } from '../../UI/Loading';
import Map from '../../UI/Map';
import Prompt from '../../UI/Prompt';
import AuthContext from '../../shared/context/auth-context';
import { AlertDescription, AlertTitle, CloseButton, SimpleGrid } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import FeatureBlock from '../../UI/FeatureBlock';
import {FaDollarSign, FaRupeeSign} from 'react-icons/fa';
import {MdOutlineBedroomParent, MdOutlineBed} from 'react-icons/md';
import AmenitiesSection from './AmenitiesSections';
import { useHistory } from 'react-router-dom';
import PlaceBooking from '../../booking/PlaceBooking';
import { Alert } from '@chakra-ui/react';
import { AlertIcon } from '@chakra-ui/react';


const PlaceFullView = (props) => {
    const history = useHistory();
    const authCtx = useContext(AuthContext);
    const {isLoading, sendRequest} = useHttp();
    const [showPrompt, setShowPrompt] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");
    const [chakraPaymentStatus, setChakraPaymentStatus] = useState("");
    
    useEffect(() => {
        // Check to see if this is a redirect back from Stripe Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            setPaymentStatus(
                "Booking successful! See more details in 'My Bookings' section"
            );    
            setChakraPaymentStatus("success");
        }

        if (query.get("cancelled")) {
            setPaymentStatus(
                "Booking failed! Try again!"
            );
            setChakraPaymentStatus("error");
        }
    }, []);

    const openPromptHandler = (event) => {
        event.preventDefault();
        setShowPrompt(true);
        console.log("HIT");
    }
    const closePromptHandler = () => setShowPrompt(false);
    console.log(props);
    const deletePlaceHandler = async (event) => {
        event.preventDefault();
        console.log("Deleting place!");
        closePromptHandler();
        try{
            const response = await sendRequest({
                url: `${process.env.REACT_APP_BACKEND_URL}/api/place/${props.place.id}`,
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: "Bearer "+ authCtx.token
                },
            });
        } catch{

        }    
        history.push(`/user/${props.place.creator.id}/places`);  

    }
    const creatorImageLink = `${process.env.REACT_APP_BACKEND_URL}/`+props.place.creator.image;
    const placeImageLink = `${process.env.REACT_APP_BACKEND_URL}/`+props.place.image;
    return (
        <React.Fragment>

            <Prompt
                show = {showPrompt}
                onCancel = {closePromptHandler}
                header = {`Are you sure you want to delete ${props.place.title}?`}>
                <React.Fragment>
                    <button onClick = {deletePlaceHandler} className = "btn btn-danger">Yes, delete it</button>
                    <button onClick = {closePromptHandler} className = "btn btn-warning">No</button>
                </React.Fragment>

            </Prompt>
            <div className = {styles["place-container"]}>
                <div className = {styles["place"]}>
                    <div className = {styles["place-image-container"]} >
                        <img alt = "Place pic" src = {placeImageLink} className = {styles["place-image"]}></img>
                    </div>
                                       
                    <div className = {styles["place-info"]}>
                        <div className = {styles["place-title"]}>
                            {props.place.title}
                        </div> 
                        {
                            chakraPaymentStatus !== "" &&
                            <Alert status = {chakraPaymentStatus} className = {styles['chakra-alert']}>
                                <AlertIcon />
                                <AlertDescription>
                                    {paymentStatus}
                                </AlertDescription>
                                
                                <CloseButton position='absolute' right='8px' top='8px' />
                            </Alert>
                        }
                        {
                            authCtx.isLoggedIn && 
                            <div className = {styles["section-header"]}>
                                📆 Book {props.place.title}
                            </div>
                        }
                        {
                            authCtx.isLoggedIn && 
                            <div className = {styles["place-booking"]}>
                                <PlaceBooking place = {props.place}></PlaceBooking>
                            </div>
                        }
                        {
                            authCtx.isLoggedIn && authCtx.userId === props.place.creator.id &&
                            <div className = {styles["section-header"]}>
                                ✍🏽 Owner actions
                            </div>
                        }
                        <div className = {styles["place-actions"]}>
                            {
                                authCtx.isLoggedIn && authCtx.userId === props.place.creator.id &&
                                <div className = {styles["place-action"]}>
                                    <Link to = {`/edit-place/${props.place.id}`} className="btn btn-warning">
                                        Edit
                                    </Link>                                    
                                </div>
                            }
                            {
                                authCtx.isLoggedIn && authCtx.userId === props.place.creator.id &&
                                <div className = {styles["place-action"]}>                                
                                    <button onClick = {openPromptHandler} className = "btn btn-danger">
                                        {!isLoading && "Delete"}
                                        {isLoading && <LoadingWhite></LoadingWhite>}
                                    </button>                     
                                </div>
                            }                                                                                          
                        </div>
                        <div className = {styles["section-header"]}>
                            🔎 Overview
                        </div>
                        <SimpleGrid minChildWidth='240px' spacing='40px'>
                            <FeatureBlock icon = {<MdOutlineBedroomParent />} data = {`${props.place.numberOfBedrooms} bedrooms`} />
                            <FeatureBlock icon = {<MdOutlineBed />} data = {`${props.place.numberOfBeds} beds`} />
                            <FeatureBlock icon = {<FaRupeeSign />} data = {`₹ ${props.place.price} / night`} />
                        </SimpleGrid>
                    
                        <div className = {styles["section-header"]}>
                            📚 Description
                        </div>
                        <div className = {styles["place-description"]}>
                        {props.place.description}
                        </div>
                        <div className = {styles["section-header"]}>
                            🛁 Amenities
                        </div>
                        <AmenitiesSection amenities = {props.place.amenities}></AmenitiesSection>

                        <div className = {styles["section-header"]}>
                            💁‍♂️ Meet the host
                        </div>
                        <div className = {styles["place-creator"]}> 
                            <Link className = {styles["place-creator"]} to={`/user/${props.place.creator.id}/places`}>
                                <Image
                                    className = {styles["creator-image"]}
                                    borderRadius='full'
                                    boxSize='70px'
                                    src = {creatorImageLink}
                                    alt='Host'
                                />
                                <div className = {styles["creator-info"]}>
                                    {props.place.creator.name} 
                                </div>
                                
                            </Link>
                        </div>

                        <div className = {styles["place-address"]}>
                            <div className = {styles["section-header"]}>
                                📌 Location
                            </div>
                            {props.place.address}
                        </div>
                        
                        <div className = {styles["section-header"]}>
                                🗺 View on Google Maps
                        </div>
                        <div className = {styles["map-container"]}>
                            <Map center = {props.place.location} zoom = {16}></Map>
                        </div>  
                    </div>
                </div>           
            </div>
        </React.Fragment>
    );
};

export default PlaceFullView;