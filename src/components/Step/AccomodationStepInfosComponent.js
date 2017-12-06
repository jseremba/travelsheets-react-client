import React, {PureComponent} from 'react';
import moment from "moment";
import {Table} from "react-bootstrap";

export default class AccomodationStepInfosComponent extends PureComponent {
    render() {
        const {step} = this.props;

        return (
            <Table bordered>
                <tbody>
                {step.dateStart ? (
                    <tr>
                        <th>{step['@type'] === 'TransportationStep' ? 'Départ le' : 'Arrivée le'}</th>
                        <td>{moment(step.dateStart).format('DD/MM/YYYY HH:mm')}</td>
                    </tr>
                ) : null}
                {step.dateEnd ? (
                    <tr>
                        <th>{step['@type'] === 'TransportationStep' ? 'Arrivée le' : 'Départ le'}</th>
                        <td>{moment(step.dateEnd).format('DD/MM/YYYY HH:mm')}</td>
                    </tr>
                ) : null}
                {step.type ? (
                    <tr>
                        <th>Type de transport</th>
                        <td>{step.type}</td>
                    </tr>
                ) : null}
                {step.company ? (
                    <tr>
                        <th>Compagnie</th>
                        <td>{step.company}</td>
                    </tr>
                ) : null}
                {step.bookingNumber ? (
                    <tr>
                        <th>Numéro de réservation</th>
                        <td>{step.bookingNumber}</td>
                    </tr>
                ) : null}
                {step.flightNumber ? (
                    <tr>
                        <th>Numéro du vol</th>
                        <td>{step.flightNumber}</td>
                    </tr>
                ) : null}
                {step.openingLuggage ? (
                    <tr>
                        <th>Ouverture du dépot des bagages</th>
                        <td>{moment(step.openingLuggage).format('HH:mm')}</td>
                    </tr>
                ) : null}
                {step.closingLuggage ? (
                    <tr>
                        <th>Fermeture du dépot des bagages</th>
                        <td>{moment(step.closingLuggage).format('HH:mm')}</td>
                    </tr>
                ) : null}
                {step.seat ? (
                    <tr>
                        <th>Sièges</th>
                        <td>{step.seat}</td>
                    </tr>
                ) : null}
                {step.price ? (
                    <tr>
                        <th>Prix</th>
                        <td>{step.price.toFixed(2)}&nbsp;€</td>
                    </tr>
                ) : null}
                </tbody>
            </Table>
        );
    }
}