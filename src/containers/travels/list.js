import React from 'react';
import {Link} from "react-router-dom";

export default () => (
    <div>
        <div className="list-group">
            <Link className="list-group-item" to="/travel/1">
                <h4 className="list-group-item-heading">Croatie</h4>
                <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p className="list-group-item-text">21/08/2017  - 01/09/2017</p>
            </Link>
            <Link className="list-group-item" to="/travel/1">
                <h4 className="list-group-item-heading">Croatie</h4>
                <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p className="list-group-item-text">21/08/2017  - 01/09/2017</p>
            </Link>
            <Link className="list-group-item" to="/travel/1">
                <h4 className="list-group-item-heading">Croatie</h4>
                <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p className="list-group-item-text">21/08/2017  - 01/09/2017</p>
            </Link>
        </div>
        <div className="btn-group" role="group" aria-label="...">
            <Link to="/travels/new" className="btn btn-default btn-sm"><i className="glyphicon glyphicon-plus"/></Link>
        </div>
    </div>
);