import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom' 
import NewPlace from './places/pages/NewPlace';
import Users from './users/pages/Users';
import './App.css';
import Navbar from './shared/components/Navbar';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
function App() {
  return (
    <div className = "app-container">
      <Router>
        <Navbar />
        <Switch>
          <Route path = "/" exact>
          <h1>Let's start!</h1>
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
          <Route path = "/users" exact>
            <Users></Users>
          </Route>
          <Redirect to = "/"></Redirect>
        </Switch>      
      </Router>   
    </div>
     
  );
}

export default App;
