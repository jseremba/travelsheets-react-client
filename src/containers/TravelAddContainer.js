import React, { Component } from 'react';
import {Button, ControlLabel, FormControl, FormGroup, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as travelAddActions from "../actions/TravelAddActions";

class TravelAddContainer extends Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
    }

    close() {
        this.props.travelAddActions.closeModal();
    }

    save() {
        this.props.travelAddActions.save();

        this.props.travelAddActions.closeModal();
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouveau Voyage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup controlId="travelName">
                            <ControlLabel>Nom*</ControlLabel>
                            <FormControl type="text" placeholder="Mon super voyage" />
                        </FormGroup>
                        <FormGroup controlId="travelSummary">
                            <ControlLabel>Description</ControlLabel>
                            <FormControl componentClass="textarea" placeholder="Youpi, je pars en voyage ! Heureusement, TravelSheets m'accompagne ;)" />
                        </FormGroup>
                        <FormGroup controlId="travelDateStart">
                            <ControlLabel>Date de début*</ControlLabel>
                            <FormControl type="date" placeholder="dd/mm/yyyy" />
                        </FormGroup>
                        <FormGroup controlId="travelDateEnd">
                            <ControlLabel>Date de fin</ControlLabel>
                            <FormControl type="date" placeholder="dd/mm/yyyy" />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Fermer</Button>
                    <Button onClick={this.save} bsStyle="success">{this.props.isAdding ? (<i className="glyphicon glyphicon-repeat"/>) : 'Enregistrer'}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.TravelAddReducer.showModal,
        travel: state.TravelAddReducer.travel
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        travelAddActions: bindActionCreators(travelAddActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelAddContainer);
