import React from 'react';
import { Route, Link } from 'react-router-dom';

import {PrivateRoute} from "../components/PrivateRoute";

import TravelsContainer from './TravelsContainer';
import TravelContainer from './TravelContainer';
import NotificationsContainer from "./NotificationsContainer";
import ConfirmContainer from "./ConfirmContainer";
import LoginContainer from "./LoginContainer";
import RegisterContainer from "./RegisterContainer";
import NavbarContainer from "./NavbarContainer";

const App = () => (
    <div>
        <NavbarContainer/>

        <PrivateRoute exact path="/" component={TravelsContainer}/>
        <PrivateRoute exact path="/travels/:id" component={TravelContainer}/>

        <Route exact path="/login" component={LoginContainer}/>
        <Route exact path="/register" component={RegisterContainer}/>

        <NotificationsContainer/>
        <ConfirmContainer/>
    </div>
);

export default App;