import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Glyphicon, Modal} from "react-bootstrap";

import * as AttachmentFormActions from '../actions/AttachmentFormActions';
import * as FileUploadActions from '../actions/FileUploadActions';
import AttachmentFormComponent from "../components/AttachmentFormComponent";

class AttachmentFormContainer extends Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleClose() {
        this.props.attachmentFormActions.closeModal();
    }

    handleSave() {
        const {attachmentFormComponent} = this.refs;
        attachmentFormComponent.button.click();
    }

    validate() {
        let isValid = true;

        const {name, file} = this.props.values;

        if(!name.value || name.value.length === 0) {
            this.props.attachmentFormActions.setError('name', 'Ce champs ne peut pas être vide');
            isValid = false;
        }

        if(!file.value || file.value.length === 0) {
            this.props.attachmentFormActions.setError('file', 'Ce champs ne peut pas être vide');
            isValid = false;
        } else if(file.value === 'loading') {
            this.props.attachmentFormActions.setError('file', 'Le fichier est en cours de téléversement...', 'warning');
            isValid = false;
        }

        return isValid;
    }

    handleSubmit(e) {
        e.preventDefault();

        const {values, travel, step} = this.props;
        const {name, file} = values;

        if(this.validate()) {
            let data = {
                name: name.value,
                file: file.value,
            };

            let travelId = travel['@id'];
            let stepId = step['@id'];

            this.props.attachmentFormActions.addAttachment(travelId, stepId, data);
        }
    }

    handleChange(e, key = null) {
        let field, value;

        if(key) {
            field = key;
            value = e;
        } else {
            field = e.target.getAttribute('name');
            value = e.target.value;
        }

        this.props.attachmentFormActions.updateValue(field, value);
    }

    render() {
        const {showModal, isLoading, values} = this.props;

        return (
            <Modal show={showModal} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>Nouveau fichier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AttachmentFormComponent ref="attachmentFormComponent"
                                             onSubmit={this.handleSubmit}
                                             onChange={this.handleChange}
                                             isLoading={isLoading}
                                             values={values} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose} disabled={isLoading}>Fermer</Button>
                    <Button onClick={this.handleSave} bsStyle="success" disabled={isLoading}>{this.props.isLoading ? (<Glyphicon glyph="repeat"/>) : 'Enregistrer'}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.AttachmentFormReducer.showModal,
        isLoading: state.AttachmentFormReducer.isLoading,
        values: state.AttachmentFormReducer.values,
        step: state.AttachmentFormReducer.step,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        attachmentFormActions: bindActionCreators(AttachmentFormActions, dispatch, props),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentFormContainer);