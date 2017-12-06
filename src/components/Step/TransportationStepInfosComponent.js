import React, {PureComponent} from 'react';
import moment from "moment";
import {Table} from "react-bootstrap";

export default class TransportationStepInfosComponent extends PureComponent {
    render() {
        const {step} = this.props;

        const types = {
            plane: "Avion",
            boat: "Bateau",
            car: "Voiture",
            train: "Train",
            taxi: "Taxi / VTC",
            bike: "Vélo",
            subway: "Transports en commun",
            other: "Autre",
        };

        return (
            <Table bordered>
                <tbody>
                    <tr>
                        <th>Départ</th>
                        <td>{step.dateStart ? moment(step.dateStart).calendar() : '-'}</td>
                    </tr>
                    <tr>
                        <th>Arrivée</th>
                        <td>{step.dateEnd ? moment(step.dateEnd).calendar() : '-'}</td>
                    </tr>
                    <tr>
                        <th>Type de transport</th>
                        <td>{step.type ? types[step.type] : '-'}</td>
                    </tr>
                    <tr>
                        <th>Compagnie</th>
                        <td>{step.company ? step.company : '-'}</td>
                    </tr>
                    <tr>
                        <th>Numéro de réservation</th>
                        <td>{step.bookingNumber ? step.bookingNumber : '-'}</td>
                    </tr>
                    <tr>
                        <th>Numéro du vol / train / bateau</th>
                        <td>{step.flightNumber ? step.flightNumber : '-'}</td>
                    </tr>
                    <tr>
                        <th>Ouverture du dépot de bagages</th>
                        <td>{step.openingLuggage ? moment(step.openingLuggage).format('HH:mm') : '-'}</td>
                    </tr>
                    <tr>
                        <th>Fermeture du dépot de bagages</th>
                        <td>{step.closingLuggage ? moment(step.closingLuggage).format('HH:mm') : '-'}</td>
                    </tr>
                    <tr>
                        <th>Sièges</th>
                        <td>{step.seat ? step.seat : '-'}</td>
                    </tr>
                    <tr>
                        <th>Prix</th>
                        <td>{step.price ? (step.price.toFixed(2) + ' €') : '-'}</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}