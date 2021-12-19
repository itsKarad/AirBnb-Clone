import React, {useState, useCallback, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom' 
import { useAuth } from './hooks/use-auth';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'

import NewPlace from './places/pages/NewPlace';
import Users from './users/pages/Users';
import Navbar from './shared/components/Navbar';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import AuthContext from './shared/context/auth-context';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import About from './about/About';
import Places from './places/pages/Places';
import Explorer from './explorer/pages/Explorer';
import Place from './places/pages/Place';


function App() {
  const {token, login, logout, userId} = useAuth();

  let routes;
  if(!!token){
    routes = (
      <React.Fragment>
        <Route path = "/" exact>
          <Places></Places>
        </Route>
        <Route path = "/about" exact>
          <About></About>
        </Route>
        <Route path = "/places" exact>
          <Places></Places>
        </Route>
        <Route path = "/explore" exact>
          <Explorer></Explorer>
        </Route>
        <Route path = "/users" exact>
          <Users></Users>
        </Route>
        <Route path = "/user/:userId/places" exact>
          <UserPlaces></UserPlaces>
        </Route>
        <Route path = "/places/new" exact>
          <NewPlace></NewPlace>
        </Route>
        <Route path = "/place/:placeId">
          <Place></Place>
        </Route>
        <Route path = "/edit-place/:placeId">
          <UpdatePlace></UpdatePlace>
        </Route>
        <Redirect to = "/"></Redirect>
      </React.Fragment>
    );
  } else{
    routes = (
      <Switch>
        <Route path = "/" exact>
          <Places></Places>
        </Route>
        <Route path = "/about" exact>
          <About></About>
        </Route>
        <Route path = "/users" exact>
          <Users></Users>
        </Route>
        <Route path = "/explore" exact>
          <Explorer></Explorer>
        </Route>
        <Route path = "/place/:placeId">
          <Place></Place>
        </Route>
        <Route path = "/places" exact>
          <Places></Places>
        </Route>
        <Route path = "/sign-in">
          <SignIn></SignIn>
        </Route>
        <Route path = "/sign-up">
          <SignUp></SignUp>
        </Route>
        <Route path = "/user/:userId/places" exact>
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
