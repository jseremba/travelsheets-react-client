import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";

import * as ConfirmActions from '../actions/ConfirmActions';

class ConfirmContainer extends Component {
    constructor(props) {
        super(props);

        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    confirm() {
        const {onConfirm} = this.props;

        this.props.confirmActions.closeConfirm();

        if(onConfirm) {
            onConfirm();
        }
    }

    cancel() {
        const {onCancel} = this.props;

        this.props.confirmActions.closeConfirm();

        if(onCancel) {
            onCancel();
        }
    }

    render() {
        const {showConfirm, title, message} = this.props;

        console.log(this.props);

        return (
            <Modal show={showConfirm} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.cancel}>Annuler</Button>
                    <Button onClick={this.confirm} bsStyle="danger">Confirmer</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        showConfirm: state.ConfirmReducer.showConfirm,
        title: state.ConfirmReducer.title,
        message: state.ConfirmReducer.message,
        onConfirm: state.ConfirmReducer.onConfirm,
        onCancel: state.ConfirmReducer.onCancel,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        confirmActions: bindActionCreators(ConfirmActions, dispatch, props),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmContainer);