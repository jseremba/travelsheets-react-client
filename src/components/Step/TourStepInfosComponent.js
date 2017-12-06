import React, {PureComponent} from 'react';
import moment from "moment";
import {Table} from "react-bootstrap";

export default class TourStepInfosComponent extends PureComponent {
    render() {
        const {step} = this.props;

        const types = {
            museum: "Musée",
            place: "Lieu touristique",
            restaurant: "Restaurant",
            coffee: "Café",
            club: "Bar / Club",
            other: "Autre",
        };

        return (
            <Table bordered>
                <tbody>
                <tr>
                    <th>Début</th>
                    <td>{step.dateStart ? moment(step.dateStart).calendar() : '-'}</td>
                </tr>
                <tr>
                    <th>Fin</th>
                    <td>{step.dateEnd ? moment(step.dateEnd).calendar() : '-'}</td>
                </tr>
                <tr>
                    <th>Type de visite</th>
                    <td>{step.type ? types[step.type] : '-'}</td>
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