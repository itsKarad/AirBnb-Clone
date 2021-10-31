import React from 'react';
import { Link } from 'react-router-dom';

import './UserItem.css'
const UserItem = (props) => {
    console.log(props.user);
    return (
        <div className = "user-item-container col-sm-6 col-md-4">
            <div className = "user-item">
                <div className = "user-photo">
                    <img src = {`http://localhost:5000/${props.user.image}`} alt = "Profile pic"></img>
                </div>
                <Link to = {`/${props.user.id}/places`}>
                    <div className = "user-info">
                        <div className = "user-name">
                            {props.user.name}
                        </div>
                        <div className = "user-places">
                            {props.user.places.length} {props.user.places.length !== 1 ? "places" : "place"}
                        </div>                
                    </div>  
                </Link>                
            </div>                    
        </div>        
    );
};

export default UserItem;    