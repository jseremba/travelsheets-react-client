import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import TravelsContainer from './TravelsContainer';
import TravelContainer from './TravelContainer';

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
    </div>
);

export default App;