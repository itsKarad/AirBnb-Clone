import React from 'react';
import UserItem from './UserItem';
import { Link } from 'react-router-dom';
import './UsersList.css';

const UsersList = (props) => {
    let usersListContent;
    if(!props || !props.users || props.users.length === 0){
        usersListContent = <div className = "no-users-container">
            <h2 className = "mb-5">No users found! Want be one?</h2>
            <Link to = "/sign-up">
                <button className = "btn btn-primary">Sign up</button>
            </Link>                
        </div>
    }
    else{
        usersListContent = props.users.map((user) => {
            return(                
                <UserItem key = {user.id} user = {user}></UserItem>
            ) 
        })
    }
    return (
        <div className = "users-list row">
            {usersListContent}
        </div>        
    );
};

export default UsersList;    