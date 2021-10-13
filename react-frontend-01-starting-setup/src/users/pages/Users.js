import React from 'react';
import Card from '../../UI/Card';
import UsersList from '../components/UsersList';
import './Users.css';
const DUMMY_USERS = [
    {
        id: "u1",
        name: "karad",
        image: "https://miro.medium.com/fit/c/262/262/0*tIA6HzFlkgwlWOk6.jpg",
        places: 3
    },
    {
        id: "u2",
        name: "karad",
        image: "https://miro.medium.com/fit/c/262/262/0*tIA6HzFlkgwlWOk6.jpg",
        places: 3
    },
    {
        id: "u3",
        name: "karad",
        image: "https://miro.medium.com/fit/c/262/262/0*tIA6HzFlkgwlWOk6.jpg",
        places: 3
    },
    {
        id: "u4",
        name: "karad",
        image: "https://miro.medium.com/fit/c/262/262/0*tIA6HzFlkgwlWOk6.jpg",
        places: 3
    },
    {
        id: "u5",
        name: "karad",
        image: "https://miro.medium.com/fit/c/262/262/0*tIA6HzFlkgwlWOk6.jpg",
        places: 3
    },
    {
        id: "u6",
        name: "karad",
        image: "https://miro.medium.com/fit/c/262/262/0*tIA6HzFlkgwlWOk6.jpg",
        places: 3
    },
];

const Users = (props) => {
    return (
        <div className = "users-page-container container">
            <h1 className = "users-header">Our Users</h1>
            <Card>
                <UsersList users = {DUMMY_USERS}></UsersList>
            </Card>
            
        </div>
        
    );
};

export default Users;