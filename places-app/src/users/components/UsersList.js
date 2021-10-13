import React from 'react';
import UserItem from './UserItem';
import './UsersList.css';

const UsersList = (props) => {
    let usersListContent;
    if(!props || !props.users || props.users.length === 0){
        usersListContent = <p>No users found!</p>
    }
    else{
        usersListContent = props.users.map((user) => {
            return <UserItem key = {user.id} user = {user}></UserItem>
        })
    }
    return (
        <div className = "users-list row">
            {usersListContent}
        </div>        
    );
};

export default UsersList;    