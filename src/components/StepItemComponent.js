import React, { PureComponent } from 'react';

import moment from 'moment';

export default class StepsListComponent extends PureComponent {
    render() {
        const {step} = this.props;

        if(!step) {
            return '';
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading" role="tab" id={`heading-${step['@id']}`}>
                    <h3 className="panel-title">
                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href={`#collapse-${step['@id']}`} aria-expanded="false" aria-controls={`collapse-${step['@id']}`}>
                            <i className={`icon-step ${step['@type'].toLowerCase()} ${step.type}`}/>&nbsp;&nbsp;{step.name}
                        </a>
                    </h3>
                </div>
                <div id={`collapse-${step['@id']}`} className="panel-collapse collapse" role="tabpanel" aria-labelledby={`heading-${step['@id']}`} aria-expanded="false">
                    <div className="panel-body">
                        {step.summary ? (
                            <p>{step.summary}</p>
                        ) : ''}

                        <h4>Informations</h4>

                        <table className="table table-bordered">
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
                                        <td>{step.price}&nbsp;€</td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}