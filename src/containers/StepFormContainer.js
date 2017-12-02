import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as StepFormActions from '../actions/StepFormActions';
import {Button, Modal} from "react-bootstrap";

import TransportationStepFormComponent from "../components/TransportationStepFormComponent";
import TourStepFormComponent from "../components/TourStepFormComponent";
import AccomodationStepFormComponent from "../components/AccomodationStepFormComponent";

class StepFormContainer extends Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    close() {
        this.props.stepFormActions.closeModal();
    }

    save() {
        const {stepFormComponent} = this.refs;

        if(stepFormComponent) {
            stepFormComponent.button.click();
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('submit');
    }

    handleChange() {
        console.log('change');
    }


    render() {
        const {step, showModal, values, isLoading, type} = this.props;

        console.log(type);

        return (
            <Modal show={showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>{step ? `Modifier l'étape` : `Nouvelle étape`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        type === 'transportation' ? (
                            <TransportationStepFormComponent ref="stepFormComponent"
                                                             values={values}
                                                             onSubmit={this.handleSubmit}
                                                             onChange={this.handleChange}
                                                             isLoading={isLoading}/>
                        ) : (
                            type === 'accomodation' ? (
                                <AccomodationStepFormComponent ref="stepFormComponent"
                                                               values={values}
                                                               onSubmit={this.handleSubmit}
                                                               onChange={this.handleChange}
                                                               isLoading={isLoading}/>
                            ) : (
                                <TourStepFormComponent ref="stepFormComponent"
                                                       values={values}
                                                       onSubmit={this.handleSubmit}
                                                       onChange={this.handleChange}
                                                       isLoading={isLoading}/>
                            )
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}
                            disabled={isLoading}>Fermer</Button>
                    <Button onClick={this.save}
                            bsStyle="success"
                            disabled={isLoading}>
                        {this.props.isLoading ? (<i className="glyphicon glyphicon-repeat"/>) : 'Enregistrer'}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.StepFormReducer.showModal,
        values: state.StepFormReducer.values,
        isLoading: state.StepFormReducer.isLoading,
        type: state.StepFormReducer.type
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        stepFormActions: bindActionCreators(StepFormActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepFormContainer);