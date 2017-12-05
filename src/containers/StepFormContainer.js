import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as StepFormActions from '../actions/StepFormActions';
import {Button, Modal} from "react-bootstrap";

import TransportationStepFormComponent from "../components/TransportationStepFormComponent";
import TourStepFormComponent from "../components/TourStepFormComponent";
import AccomodationStepFormComponent from "../components/AccomodationStepFormComponent";
import Moment from "moment";

const REGEX_TIME = /^(([0-1][0-9])|([2][0-3])):([0-5][0-9])(:([0-5][0-9]))?$/;
const REGEX_PRICE = /^[0-9]*(\.[0-9]{1,2})?$/;

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

    validate() {
        let isValid = true;

        const {name, dateStart, dateEnd, price, type, openingLuggage, closingLuggage} = this.props.values;

        // Name
        if(!name.value || name.value.length === 0) {
            this.props.stepFormActions.setError('name', 'Ce champs ne doit pas être vide');
            isValid = false;
        }

        // DateStart
        if(!dateStart.value) {
            this.props.stepFormActions.setError('dateStart', 'Ce champs est obligatoire');
            isValid = false;
        } else if(!(dateStart.value instanceof Moment) || !dateStart.value.isValid()) {
            this.props.stepFormActions.setError('dateStart', 'La date est invalide');
            isValid = false;
        }

        // DateEnd
        if(dateEnd.value) {
            if(!(dateEnd.value instanceof Moment) || !dateEnd.value.isValid()) {
                this.props.stepFormActions.setError('dateEnd', 'La date est invalide');
                isValid = false;
            } else if (dateEnd.value.isBefore(dateStart.value)) {
                this.props.stepFormActions.setError('dateEnd', 'La date de fin doit être après celle du début');
                isValid = false;
            }
        }

        // Price
        if(price.value && price.value.length > 0) {
            if(!REGEX_PRICE.test(price.value)) {
                this.props.stepFormActions.setError('price', 'Le prix est invalide');
                isValid = false;
            }
        }

        // Type
        if(!type.value || type.value.length === 0) {
            this.props.stepFormActions.setError('type', 'Ce champs ne peut pas être vide');
            isValid = false;
        }

        // Opening luggage
        if(openingLuggage.value && openingLuggage.value.length > 0) {
            if(!REGEX_TIME.test(openingLuggage.value)) {
                this.props.stepFormActions.setError('openingLuggage', 'L\'heure est invalide');
                isValid = false;
            }
        }

        // Closing luggage
        if(closingLuggage.value && closingLuggage.value.length > 0) {
            if(!REGEX_TIME.test(closingLuggage.value)) {
                this.props.stepFormActions.setError('closingLuggage', 'L\'heure est invalide');
                isValid = false;
            }
        }

        return isValid;
    }

    handleSubmit(e) {
        e.preventDefault();

        const {step, values, type, travel} = this.props;

        if(this.validate()) {
            let data = {
                name: values.name.value ? values.name.value : '',
                dateStart: values.dateStart.value ? values.dateStart.value.format('YYYY-MM-DD HH:mm:ss') : null,
                dateEnd: values.dateEnd.value ? values.dateEnd.value.format('YYYY-MM-DD HH:mm:ss') : null,
                summary: values.summary.value ? values.summary.value : '',
                price: values.summary.price ? values.summary.price : 0,
                type: values.type.value ? values.type.value : '',
            };

            if(type === 'AccomodationStep') {
                data = {
                    ...data,
                    company: values.company.value ? values.company.value : '',
                    bookingNumber: values.bookingNumber.value ? values.bookingNumber.value : '',
                }
            } else if(type === 'TourStep') {
                data = {
                    ...data,
                    bookingNumber: values.bookingNumber.value ? values.bookingNumber.value : '',
                }
            } else {
                data = {
                    ...data,
                    company: values.company.value ? values.company.value : '',
                    bookingNumber: values.bookingNumber.value ? values.bookingNumber.value : '',
                    flightNumber: values.flightNumber.value ? values.flightNumber.value : '',
                    openingLuggage: values.openingLuggage.value ? values.openingLuggage.value.format('YYYY-MM-DD HH:mm:ss') : null,
                    closingLuggage: values.closingLuggage.value ? values.closingLuggage.value.format('YYYY-MM-DD HH:mm:ss') : null,
                    seat: values.seat.value,
                }
            }

            if(step) {
                this.props.stepFormActions.edit(step['@id'], travel['@id'], data);
            } else {
                this.props.stepFormActions.add(travel['@id'], type, data);
            }
        }
    }

    handleChange(e, field = null) {
        let name, value;

        if(field) {
            name = field;
            value = e;
        } else {
            name = e.target.getAttribute('name');
            value = e.target.value;
        }

        this.props.stepFormActions.updateValue(name, value);
    }


    render() {
        const {step, showModal, values, isLoading, type} = this.props;

        return (
            <Modal show={showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>{step ? `Modifier l'étape` : `Nouvelle étape`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        type === 'TransportationStep' ? (
                            <TransportationStepFormComponent ref="stepFormComponent"
                                                             values={values}
                                                             onSubmit={this.handleSubmit}
                                                             onChange={this.handleChange}
                                                             isLoading={isLoading}/>
                        ) : (
                            type === 'AccomodationStep' ? (
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
        type: state.StepFormReducer.type,
        step: state.StepFormReducer.step
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        stepFormActions: bindActionCreators(StepFormActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepFormContainer);