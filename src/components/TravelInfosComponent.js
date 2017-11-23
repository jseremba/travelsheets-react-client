import React, { PureComponent } from 'react';
import {Link} from "react-router-dom";
import Moment from 'moment';

export default class TravelInfosComponent extends PureComponent {
    render() {
        const {travel} = this.props;

        if(!travel) {
            return '';
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="btn-group fr" role="group" aria-label="...">
                        <Link to="/travels/{travel['@id']}/edit" className="btn btn-default btn-xs"><i className="glyphicon glyphicon-pencil"/></Link>
                        <Link to="/travels/{travel['@id']}/delete" className="btn btn-default btn-xs"><i className="glyphicon glyphicon-trash"/></Link>
                        {/*<a href="/travels/1/edit" className="btn btn-default btn-xs" data-toggle="tooltip" data-placement="top" title="" data-original-title="Modifier"><i className="glyphicon glyphicon-pencil"></i></a>*/}
                        {/*<a href="/travels/1/delete" className="btn btn-default btn-xs" data-toggle="tooltip" data-placement="top" title="" data-original-title="Supprimer"><i className="glyphicon glyphicon-trash"></i></a>*/}
                    </div>
                    <div className="panel-title">{travel.name}</div>
                </div>
                <div className="panel-body">
                    <p>{travel.summary}</p>
                    <p>– du {Moment(travel.dateStart).format('DD/MM/YYYY')} au {Moment(travel.dateEnd).format('DD/MM/YYYY')}</p>
                </div>
            </div>
        )
    }
}