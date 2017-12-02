import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as StepFormActions from '../actions/StepFormActions';
import {Button, Modal} from "react-bootstrap";

class StepFormContainer extends Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
    }

    close() {
        this.props.stepFormActions.closeModal();
    }

    save() {
        console.log('save');
    }


    render() {
        const {step, showModal, values, isLoading} = this.props;

        return (
            <Modal show={showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>{step ? `Modifier l'étape` : `Nouvelle étape`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*<TravelFormComponent ref="travelFormComponent" values={values} onSubmit={this.handleSubmit} onChange={this.handleChange} isLoading={isLoading} />*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close} disabled={isLoading}>Fermer</Button>
                    <Button onClick={this.save} bsStyle="success" disabled={isLoading}>{this.props.isLoading ? (<i className="glyphicon glyphicon-repeat"/>) : 'Enregistrer'}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.StepFormReducer.showModal,
        values: state.StepFormReducer.values,
        isLoading: state.StepFormReducer.isLoading
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        stepFormActions: bindActionCreators(StepFormActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepFormContainer);