import React, {PureComponent} from 'react';
import moment from "moment";
import {Table} from "react-bootstrap";

export default class AccomodationStepInfosComponent extends PureComponent {
    render() {
        const {step} = this.props;

        const types = {
            hotel: "Hôtel",
            location: "Location",
            camping: "Camping",
            hostel: "Auberge",
            other: "Autre",
        };

        return (
            <Table bordered>
                <tbody>
                <tr>
                    <th>Arrivée</th>
                    <td>{step.dateStart ? moment(step.dateStart).calendar() : '-'}</td>
                </tr>
                <tr>
                    <th>Départ</th>
                    <td>{step.dateEnd ? moment(step.dateEnd).calendar() : '-'}</td>
                </tr>
                <tr>
                    <th>Type de logement</th>
                    <td>{types[step.type]}</td>
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
                    <th>Prix</th>
                    <td>{step.price ? (step.price.toFixed(2) + ' €') : '-'}</td>
                </tr>
                </tbody>
            </Table>
        );
    }
}