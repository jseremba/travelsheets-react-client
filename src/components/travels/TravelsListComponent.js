import React, { PureComponent } from 'react';
import {Link} from "react-router-dom";

export default class TravelsListComponent extends PureComponent {
    createListItem(travel) {
        return (
            <Link className="list-group-item" to={'/travels/' + travel.id} key={travel['@id']}>
                <h4 className="list-group-item-heading">{travel.name}</h4>
                <p className="list-group-item-text">{travel.summary}</p>
                <p className="list-group-item-text">21/08/2017  - 01/09/2017</p>
            </Link>
        );
    }

    render() {
        const { travels, isLoading } = this.props;

        return (
            <div>
                { isLoading
                    ? <p className='loading'>Loading</p>
                    : null
                }
                <div className="list-group">
                    {
                        // A Game is only shown if its name contains the string from the searchBar
                        travels.map((travel, i) => {
                            return this.createListItem(travel);
                        })
                    }
                </div>
                <div className="btn-group" role="group" aria-label="...">
                    <Link to="/travels/new" className="btn btn-default btn-sm"><i className="glyphicon glyphicon-plus"/></Link>
                </div>
            </div>
        );
    }
}