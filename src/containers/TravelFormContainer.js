import React, { Component } from 'react';
import {Button, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as travelFormActions from "../actions/TravelFormActions";
import TravelFormComponent from "../components/TravelFormComponent";

const REGEX_DATE = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/;

class TravelEditContainer extends Component {
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

    componentDidMount(nextProps) {
        const {travel} = this.props;

        if(travel) {
            this.props.travelFormActions.setTravel(travel);
        }
    }

    validate() {
        let isValid = true;

        const {name, summary, dateStart, dateEnd} = this.props.values;

        if(!name.value || name.value.length === 0) {
            this.props.travelFormActions.setError('name', 'Ce champs est obligatoire');
            isValid = false;
        }

        if(!dateStart.value || dateStart.value.length === 0) {
            this.props.travelFormActions.setError('dateStart', 'Ce champs est obligatoire');
            isValid = false;
        } else {
            if(!REGEX_DATE.test(dateStart.value)) {
                this.props.travelFormActions.setError('dateStart', 'La date est invalide');
                isValid = false;
            }
        }

        if(dateEnd.value && dateEnd.value.length > 0) {
            if(!REGEX_DATE.test(dateEnd.value)) {
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

        const {travel, values} = this.props;

        if(this.validate()) {
            if(travel) {
                this.props.travelFormActions.edit(travel['@id'], {
                    name: values.name.value,
                    summary: values.summary.value,
                    dateStart: values.dateStart.value,
                    dateEnd: values.dateEnd.value,
                });
            } else {
                this.props.travelFormActions.add({
                    name: values.name.value,
                    summary: values.summary.value,
                    dateStart: values.dateStart.value,
                    dateEnd: values.dateEnd.value,
                });
            }
        }
    }

    render() {
        const {travel, showModal, values, isLoading} = this.props;

        return (
            <Modal show={showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>{travel ? 'Modifier le voyage' : 'Nouveau voyage'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TravelFormComponent ref="travelFormComponent" values={values} onSubmit={this.handleSubmit} onChange={this.handleChange} isLoading={isLoading} />
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

export default connect(mapStateToProps, mapDispatchToProps)(TravelEditContainer);
