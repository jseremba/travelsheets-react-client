import React, { PureComponent } from 'react';
import {Link} from "react-router-dom";

export default class TravelsListComponent extends PureComponent {
    createListItem(item) {
        return (
            <Link className="list-group-item" to={`/travels/${item['@id']}`} key={item['@id']}>
                <h4 className="list-group-item-heading">{item.name}</h4>
                <p className="list-group-item-text">{item.summary}</p>
                <p className="list-group-item-text">21/08/2017  - 01/09/2017</p>
            </Link>
        );
    }

    render() {
        const {travels} = this.props;

        if(!travels) {
            return (
                <p>Vous n'avez aucun voyage, partez à l'aventure !</p>
            );
        }

        return (
            <div className="list-group">
                {
                    // A Game is only shown if its name contains the string from the searchBar
                    travels && travels.map((travel, i) => {
                        return this.createListItem(travel);
                    })
                }
            </div>
        );
    }
}