import React, { Component } from 'react';
import {Button, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as travelDeleteActions from "../actions/TravelDeleteActions";

class TravelDeleteContainer extends Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.delete = this.delete.bind(this);
    }

    close() {
        this.props.travelDeleteActions.closeModal();
    }

    delete() {
        const {travel} = this.props;

        if(travel) {
            let id = travel['@id'];
            this.props.travelDeleteActions.deleteTravel(id);
        }
    }

    render() {
        const {showModal, isLoading} = this.props;

        return (
            <Modal show={showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>Supprimer le voyage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Voulez-vous vraiment supprimer ce voyage ?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close} disabled={isLoading}>Annuler</Button>
                    <Button onClick={this.delete} bsStyle="danger" disabled={isLoading}>{this.props.isLoading ? (<i className="glyphicon glyphicon-repeat"/>) : 'Supprimer'}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.TravelDeleteReducer.showModal,
        isLoading: state.TravelDeleteReducer.isLoading
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        travelDeleteActions: bindActionCreators(travelDeleteActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelDeleteContainer);
