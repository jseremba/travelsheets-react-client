import React, { PureComponent } from 'react';
import {Link} from "react-router-dom";
import {Button, ButtonGroup, Panel} from "react-bootstrap";
import Moment from 'moment';

export default class TravelInfosComponent extends PureComponent {
    render() {
        const {travel, onEdit} = this.props;

        if(!travel) {
            return '';
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <ButtonGroup style={{float: 'right'}}>
                        <Button bsStyle="primary" bsSize="xsmall" onClick={onEdit}>
                            <i className="glyphicon glyphicon-pencil"/>
                        </Button>
                    </ButtonGroup>

                    <h2 className="panel-title">Informations</h2>
                </div>
                <div className="panel-body">
                    <p>{travel.summary}</p>
                    <p>– du {Moment(travel.dateStart).format('DD/MM/YYYY')} au {Moment(travel.dateEnd).format('DD/MM/YYYY')}</p>
                </div>
            </div>
        )
    }
}