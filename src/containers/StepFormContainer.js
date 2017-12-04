import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as StepFormActions from '../actions/StepFormActions';
import {Button, Modal} from "react-bootstrap";

import TransportationStepFormComponent from "../components/TransportationStepFormComponent";
import TourStepFormComponent from "../components/TourStepFormComponent";
import AccomodationStepFormComponent from "../components/AccomodationStepFormComponent";

const REGEX_DATE = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/;
const REGEX_DATETIME = /^(19[0-9]{2}|[2-9][0-9]{3})-((0(1|3|5|7|8)|10|12)-(0[1-9]|1[0-9]|2[0-9]|3[0-1])|(0(4|6|9)|11)-(0[1-9]|1[0-9]|2[0-9]|30)|(02)-(0[1-9]|1[0-9]|2[0-9]))\x20(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/;
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

        // Date Start
        if(!dateStart.value || dateStart.value.length === 0) {
            this.props.stepFormActions.setError('dateStart', 'Ce champs ne doit pas être vide');
            isValid = false;
        } else {
            if(!REGEX_DATETIME.test(dateStart.value)) {
                this.props.stepFormActions.setError('dateStart', 'La date est invalide');
                isValid = false;
            }
        }

        // Date End
        if(dateEnd.value && dateEnd.value.length > 0) {
            if(!REGEX_DATETIME.test(dateEnd.value)) {
                this.props.stepFormActions.setError('dateEnd', 'La date est invalide');
                isValid = false;
            } else {
                let dateStartDate = new Date(dateStart.value);
                let dateEndDate = new Date(dateEnd.value);

                if(dateEndDate.getTime() < dateStartDate.getTime()) {
                    this.props.stepFormActions.setError('dateEnd', 'La date de fin doit être après celle du début');
                    isValid = false;
                }
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
            let data = {};

            // Set data for form
            for(let key in values) {
                if(values.hasOwnProperty(key)) {
                    if(values[key].value && values[key].value.length > 0) {
                        data[key] = values[key].value;
                    }
                }
            }

            if(step) {
                this.props.stepFormActions.edit(step['@id'], travel['@id'], data);
            } else {
                this.props.stepFormActions.add(travel['@id'], type, data);
            }
        }
    }

    handleChange(e) {
        let name = e.target.getAttribute('name');
        let value = e.target.value;

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