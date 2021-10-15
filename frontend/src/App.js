import React, {useState, useCallback} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom' 
import NewPlace from './places/pages/NewPlace';
import Users from './users/pages/Users';
import './App.css';
import Navbar from './shared/components/Navbar';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './auth/Auth';
import AuthContext from './shared/context/auth-context';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  let routes;
  if(isLoggedIn){
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
        <Route path = "/login">
          <Auth></Auth>
        </Route>
        <Route path = "/:userId/places" exact>
          <UserPlaces></UserPlaces>
        </Route>
        <Redirect to = "/"></Redirect>
      </Switch>
    );
  }
  return (
    <AuthContext.Provider value = {{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
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
