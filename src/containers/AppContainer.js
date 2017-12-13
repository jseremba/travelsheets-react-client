import React from 'react';
import { Route, Link } from 'react-router-dom';
import {Navbar} from 'react-bootstrap';

import TravelsContainer from './TravelsContainer';
import TravelContainer from './TravelContainer';
import NotificationsContainer from "./NotificationsContainer";
import ConfirmContainer from "./ConfirmContainer";
import LoginContainer from "./LoginContainer";
import {PrivateRoute} from "../components/PrivateRoute";

const App = () => (
    <div>
        <Navbar fixedTop={true}>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">Travelsheets</Link>
                </Navbar.Brand>
            </Navbar.Header>
        </Navbar>

        <PrivateRoute exact path="/" component={TravelsContainer}/>
        <PrivateRoute exact path="/travels/:id" component={TravelContainer}/>

        <Route exact path="/login" component={LoginContainer}/>

        <NotificationsContainer/>
        <ConfirmContainer/>
    </div>
);

export default App;