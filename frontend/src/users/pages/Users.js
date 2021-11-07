import React, {useState, useEffect} from 'react';
import useHttp from '../../hooks/use-http';
import Card from '../../UI/Card';
import { LoadingWhite } from '../../UI/Loading';
import UsersList from '../components/UsersList';
import './Users.css';

const Users = (props) => {
    const [users, setUsers] = useState(null);
    const { isLoading, sendRequest, error } = useHttp();
    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const data = await sendRequest({
                    url: `${process.env.REACT_APP_BACKEND_URL}/api/users`
                });
                console.log(data);
                setUsers(data.users);
            }
            catch(err){
                console.log(err);
            }            
        }
        fetchUsers();
    }, [sendRequest])
    
    return (
        <div className = "users-page-container container">
            <h1 className = "users-header">Our Users</h1>
            {isLoading && <div className = "error-container"><LoadingWhite></LoadingWhite></div>}
            {!isLoading && error && <p>{error}</p>}            
            {
                !isLoading && 
                <Card>
                    <UsersList users = {users}></UsersList>
                </Card>
            }           
        </div>
        
    );
};

export default Users;