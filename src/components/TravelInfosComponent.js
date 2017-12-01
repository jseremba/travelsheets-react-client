import React, { PureComponent } from 'react';
import {Link} from "react-router-dom";
import { Panel } from "react-bootstrap";
import Moment from 'moment';

export default class TravelInfosComponent extends PureComponent {
    render() {
        const {travel} = this.props;

        if(!travel) {
            return '';
        }

        return (
            <Panel header="Informations">
                <p>{travel.summary}</p>
                <p>– du {Moment(travel.dateStart).format('DD/MM/YYYY')} au {Moment(travel.dateEnd).format('DD/MM/YYYY')}</p>
            </Panel>
        )
    }
}