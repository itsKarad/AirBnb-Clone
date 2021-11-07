import React, {useState, useCallback, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom' 
import NewPlace from './places/pages/NewPlace';
import Users from './users/pages/Users';
import './App.css';
import Navbar from './shared/components/Navbar';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import AuthContext from './shared/context/auth-context';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import { useAuth } from './hooks/use-auth';

function App() {
  const {token, login, logout, userId} = useAuth();

  let routes;
  if(!!token){
    routes = (
      <React.Fragment>
        <Route path = "/" exact>
          <Users></Users>
        </Route>
        <Route path = "/users" exact>
          <Users></Users>
        </Route>
        <Route path = "/:userId/places" exact>
          <UserPlaces></UserPlaces>
        </Route>
        <Route path = "/places/new" exact>
          <NewPlace></NewPlace>
        </Route>
        <Route path = "/place/:placeId">
          <UpdatePlace></UpdatePlace>
        </Route>
        <Redirect to = "/"></Redirect>
      </React.Fragment>
    );
  } else{
    routes = (
      <Switch>
        <Route path = "/" exact>
          <Users></Users>
        </Route>
        <Route path = "/users" exact>
          <Users></Users>
        </Route>
        <Route path = "/sign-in">
          <SignIn></SignIn>
        </Route>
        <Route path = "/sign-up">
          <SignUp></SignUp>
        </Route>
        <Route path = "/:userId/places" exact>
          <UserPlaces></UserPlaces>
        </Route>
        <Redirect to = "/sign-in"></Redirect>
      </Switch>
    );
  }
  return (
    <AuthContext.Provider value = {{isLoggedIn: !!token,token: token, userId: userId, login: login, logout: logout}}>
      <div className = "app-container">
        <Router>
          <Navbar />
          <Switch>
            {routes}
          </Switch>      
        </Router>   
      </div>
    </AuthContext.Provider>
     
  );
}

export default App;
