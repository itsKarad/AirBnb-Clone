import React from 'react';
import styles from './AmenitiesSection.module.css';
import {HiOutlineWifi} from 'react-icons/hi';
import {FaParking, FaSwimmingPool} from 'react-icons/fa';
import {MdLocalDining, MdOutlinePets} from 'react-icons/md';
import {GiTowel, GiThermometerCold, GiKitchenKnives} from 'react-icons/gi';
import {CgScreen} from 'react-icons/cg';

const AmenitiesSection = (props) => {

    return (
        <div className = {styles["amenities-section"]}>
            <div className='row'>
                <div className='col-lg-6'>
                    <div className = {styles["amenity"]}>
                        <div className = {styles["icon"]}><HiOutlineWifi /></div>
                        <div className = {styles[props.amenities.hasWifi?"text":"crossed-out"]}>Wifi</div>
                    </div>
                    <div className = {styles["amenity"]}>
                        <div className = {styles["icon"]}><FaParking /></div>
                        <div className = {styles[props.amenities.hasParking?"text":"crossed-out"]}>Parking space</div>
                    </div>
                    <div className = {styles["amenity"]}>
                        <div className = {styles["icon"]}><FaSwimmingPool /></div>
                        <div className = {styles[props.amenities.hasPool?"text":"crossed-out"]}>Swimming Pool</div>
                    </div>
                    <div className = {styles["amenity"]}>
                        <div className = {styles["icon"]}><MdLocalDining /></div>
                        <div className = {styles[props.amenities.hasDining?"text":"crossed-out"]}>Dining facilities</div>
                    </div>
                    <div className = {styles["amenity"]}>
                        <div className = {styles["icon"]}><MdOutlinePets /></div>
                        <div className = {styles[props.amenities.hasPetsAllowed?"text":"crossed-out"]}>Pets are allowed</div>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className = {styles["amenity"]}>
                        <div className = {styles["icon"]}><GiTowel /></div>
                        <div className = {styles[props.amenities.hasEssentials?"text":"crossed-out"]}>Essential items</div>
                    </div>
                    <div className = {styles["amenity"]}>
                        <div className = {styles["icon"]}><GiThermometerCold /></div>
                        <div className = {styles[props.amenities.hasAirConditioning?"text":"crossed-out"]}>Air conditioning</div>
                    </div>
                    <div className = {styles["amenity"]}>
                        <div className = {styles["icon"]}><CgScreen /></div>
                        <div className = {styles[props.amenities.hasTV?"text":"crossed-out"]}>Television</div>
                    </div>
                    <div className = {styles["amenity"]}>
                        <div className = {styles["icon"]}><GiKitchenKnives /></div>
                        <div className = {styles[props.amenities.hasKitchen?"text":"crossed-out"]}>Kitchen</div>
                    </div>
                </div>
            </div>
            
            
        </div>
    )

};

export default AmenitiesSection;