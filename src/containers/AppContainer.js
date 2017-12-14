import React from 'react';
import { Route } from 'react-router-dom';

import {PrivateRoute} from "../components/PrivateRoute";

import TravelsContainer from './TravelsContainer';
import TravelContainer from './TravelContainer';
import NotificationsContainer from "./NotificationsContainer";
import ConfirmContainer from "./ConfirmContainer";
import LoginContainer from "./LoginContainer";
import RegisterContainer from "./RegisterContainer";
import NavbarContainer from "./NavbarContainer";
import RegisterConfirmContainer from "./RegisterConfirmContainer";

const App = () => (
    <div>
        <NavbarContainer/>

        <PrivateRoute exact path="/" component={TravelsContainer}/>
        <PrivateRoute exact path="/travels/:id" component={TravelContainer}/>

        <Route exact path="/login" component={LoginContainer}/>
        <Route exact path="/register" component={RegisterContainer}/>
        <Route exact path="/register/confirm" component={RegisterConfirmContainer}/>

        <NotificationsContainer/>
        <ConfirmContainer/>
    </div>
);

export default App;