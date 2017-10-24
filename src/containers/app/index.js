import React from 'react';
import { Route, Link } from 'react-router-dom';

import {TravelsContainer} from '../travels';

const App = () => (
    <div>
        <header className="header">
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-left"/>
                    <Link className="navbar-brand" to="/">TravelSheets</Link>
                </div>
            </nav>
        </header>

        <main className="container">
            <Route component={TravelsContainer}/>
        </main>
    </div>
);

export default App;