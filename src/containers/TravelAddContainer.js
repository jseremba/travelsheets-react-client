import React, { Component } from 'react';
import {Button, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as travelFormActions from "../actions/TravelFormActions";
import TravelFormComponent from "../components/TravelFormComponent";

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
        this.props.travelFormActions.closeModal();
    }

    validate() {
        let isValid = true;

        if(this.props.values.name.value.length === 0) {
            this.props.travelFormActions.setError('name', 'Ce champs est obligatoire');
            isValid = false;
        }

        if(this.props.values.dateStart.value.length === 0) {
            this.props.travelFormActions.setError('dateStart', 'Ce champs est obligatoire');
            isValid = false;
        } else {
            if(!REGEX_DATE.test(this.props.values.dateStart.value)) {
                this.props.travelFormActions.setError('dateStart', 'La date est invalide');
                isValid = false;
            }
        }

        if(this.props.values.dateEnd.value.length > 0) {
            if(!REGEX_DATE.test(this.props.values.dateEnd.value)) {
                this.props.travelFormActions.setError('dateEnd', 'La date est invalide');
                isValid = false;
            }
        }

        return isValid;
    }

    save() {
        const {travelFormComponent} = this.refs;
        travelFormComponent.button.click();
    }

    handleChange(e) {
        let name = e.target.getAttribute('name');
        let value = e.target.value;

        this.props.travelFormActions.updateValue(name, value);
    }

    handleSubmit(e) {
        e.preventDefault();

        if(this.validate()) {
            this.props.travelFormActions.add({
                name: this.props.values.name.value,
                summary: this.props.values.summary.value,
                dateStart: this.props.values.dateStart.value,
                dateEnd: this.props.values.dateEnd.value,
            });
        }
    }

    render() {
        const {showModal, values, isLoading} = this.props;

        return (
            <Modal show={showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>Nouveau Voyage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TravelFormComponent ref="travelFormComponent" values={values} onSubmit={this.handleSubmit} onChange={this.handleChange} isLoading={isLoading} />
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
    console.log(state);

    return {
        showModal: state.TravelFormReducer.showModal,
        values: state.TravelFormReducer.values,
        isLoading: state.TravelFormReducer.isLoading
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        travelFormActions: bindActionCreators(travelFormActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelAddContainer);
