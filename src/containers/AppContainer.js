import React from 'react';
import { Route, Link } from 'react-router-dom';
import {Navbar} from 'react-bootstrap';

import TravelsContainer from './TravelsContainer';
import TravelContainer from './TravelContainer';
import NotificationsContainer from "./NotificationsContainer";
import ConfirmContainer from "./ConfirmContainer";



const App = () => (
    <div>
        <Navbar fixedTop={true}>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">Travelsheets</Link>
                </Navbar.Brand>
            </Navbar.Header>
        </Navbar>

        <Route exact path="/" component={TravelsContainer}/>
        <Route exact path="/travels/:id" component={TravelContainer}/>

        <NotificationsContainer/>
        <ConfirmContainer/>
    </div>
);

export default App;