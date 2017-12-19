import React, { PureComponent } from 'react';
import {Link} from "react-router-dom";
import {ListGroup} from 'react-bootstrap';
import Moment from "moment";

export default class TravelsListComponent extends PureComponent {
    createListItem(item) {
        let dateStart = Moment(item.dateStart);
        let dateEnd = null;

        if(item.dateEnd) {
            dateEnd = Moment(item.dateEnd);
        }

        // Moment.defineLocale('fr');

        return (
            <Link className="list-group-item" to={`/travels/${item['@id']}`} key={item['@id']}>
                <h4 className="list-group-item-heading">{item.name}</h4>
                <p className="list-group-item-text">{item.summary}</p>
                <p className="list-group-item-text">
                    {dateStart.format('DD/MM/YYYY')}
                    {dateEnd ? ' - ' + dateEnd.format('DD/MM/YYYY') : ''}
                </p>
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
            <ListGroup>
                {
                    // A Game is only shown if its name contains the string from the searchBar
                    travels && travels.map((travel, i) => {
                        return this.createListItem(travel);
                    })
                }
            </ListGroup>
        );
    }
}