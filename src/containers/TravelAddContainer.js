import React, { Component } from 'react';
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as travelAddActions from "../actions/TravelAddActions";

const REGEX_DATE = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/;

class TravelAddContainer extends Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.validate = this.validate.bind(this);
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    close() {
        this.props.travelAddActions.closeModal();
    }

    validate() {
        let isValid = true;

        if(this.props.values.name.value.length === 0) {
            this.props.travelAddActions.setError('name', 'Ce champs est obligatoire');
            isValid = false;
        }

        if(this.props.values.dateStart.value.length === 0) {
            this.props.travelAddActions.setError('dateStart', 'Ce champs est obligatoire');
            isValid = false;
        } else {
            if(!REGEX_DATE.test(this.props.values.dateStart.value)) {
                this.props.travelAddActions.setError('dateStart', 'La date est invalide');
                isValid = false;
            }
        }

        if(this.props.values.dateEnd.value.length > 0) {
            if(!REGEX_DATE.test(this.props.values.dateEnd.value)) {
                this.props.travelAddActions.setError('dateEnd', 'La date est invalide');
                isValid = false;
            }
        }

        return isValid;
    }

    save() {
        this.activityFormButton.click();
    }

    handleChange(e) {
        let name = e.target.getAttribute('name');
        let value = e.target.value;

        this.props.travelAddActions.updateValue(name, value);
    }

    handleSubmit(e) {
        e.preventDefault();

        if(this.validate()) {
            this.props.travelAddActions.save({
                name: this.props.values.name.value,
                summary: this.props.values.summary.value,
                dateStart: this.props.values.dateStart.value,
                dateEnd: this.props.values.dateEnd.value,
            });
        }
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>Nouveau Voyage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="travelAddForm" ref="travelAddForm" onSubmit={this.handleSubmit}>
                        <FormGroup controlId="travelName" validationState={this.props.values.name.validation}>
                            <ControlLabel>Nom*</ControlLabel>
                            <FormControl type="text"
                                         placeholder="Mon super voyage"
                                         disabled={this.props.isLoading}
                                         value={this.props.values.name.value}
                                         name="name"
                                         onChange={this.handleChange}
                            />
                            {this.props.values.name.error && <HelpBlock>{this.props.values.name.error}</HelpBlock>}
                        </FormGroup>
                        <FormGroup controlId="travelSummary" validationState={this.props.values.summary.validation}>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl componentClass="textarea"
                                         placeholder="Youpi, je pars en voyage ! Heureusement, TravelSheets m'accompagne ;)"
                                         disabled={this.props.isLoading}
                                         value={this.props.values.summary.value}
                                         name="summary"
                                         onChange={this.handleChange}
                            />
                            {this.props.values.summary.error && <HelpBlock>{this.props.values.summary.error}</HelpBlock>}
                        </FormGroup>
                        <FormGroup controlId="travelDateStart" validationState={this.props.values.dateStart.validation}>
                            <ControlLabel>Date de début*</ControlLabel>
                            <FormControl type="date"
                                         placeholder="dd/mm/yyyy"
                                         disabled={this.props.isLoading}
                                         value={this.props.values.dateStart.value}
                                         name="dateStart"
                                         onChange={this.handleChange}
                            />
                            {this.props.values.dateStart.error && <HelpBlock>{this.props.values.dateStart.error}</HelpBlock>}
                        </FormGroup>
                        <FormGroup controlId="travelDateEnd" validationState={this.props.values.dateEnd.validation}>
                            <ControlLabel>Date de fin</ControlLabel>
                            <FormControl type="date"
                                         placeholder="dd/mm/yyyy"
                                         disabled={this.props.isLoading}
                                         value={this.props.values.dateEnd.value}
                                         name="dateEnd"
                                         onChange={this.handleChange}
                            />
                            {this.props.values.dateEnd.error && <HelpBlock>{this.props.values.dateEnd.error}</HelpBlock>}
                        </FormGroup>
                        <button style={{'display': 'none'}} type='submit' ref={ (button) => { this.activityFormButton = button } } >Submit</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close} disabled={this.props.isLoading}>Fermer</Button>
                    <Button onClick={this.save} bsStyle="success" disabled={this.props.isLoading}>{this.props.isLoading ? (<i className="glyphicon glyphicon-repeat"/>) : 'Enregistrer'}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.TravelAddReducer.showModal,
        values: state.TravelAddReducer.values,
        isLoading: state.TravelAddReducer.isLoading
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        travelAddActions: bindActionCreators(travelAddActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelAddContainer);
