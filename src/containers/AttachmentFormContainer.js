import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Glyphicon, Modal} from "react-bootstrap";

import * as AttachmentFormActions from '../actions/AttachmentFormActions';

class AttachmentFormContainer extends Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleClose() {
        this.props.attachmentFormActions.closeModal();
    }

    render() {
        const {showModal, isLoading} = this.props;

        return (
            <Modal show={showModal} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>Nouveau fichier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose} disabled={isLoading}>Fermer</Button>
                    <Button onClick={this.save} bsStyle="success" disabled={isLoading}>{this.props.isLoading ? (<Glyphicon glyph="repeat"/>) : 'Enregistrer'}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.AttachmentFormReducer.showModal,
        isLoading: state.AttachmentFormReducer.isLoading,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        attachmentFormActions: bindActionCreators(AttachmentFormActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentFormContainer);