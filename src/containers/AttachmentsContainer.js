import React, {Component} from 'react';
import {connect} from "react-redux";
import LoaderComponent from "../components/LoaderComponent";
import AttachmentsListComponent from "../components/AttachmentsListComponent";
import {bindActionCreators} from "redux";

import * as AttachmentsActions from '../actions/AttachmentsActions';
import * as ConfirmActions from '../actions/ConfirmActions';

class AttachmentsContainer extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const {travel, step} = this.props;

        this.props.attachmentsActions.fetchAttachments(travel['@id'], step['@id']);
    }

    componentWillUnmount() {
        this.props.attachmentsActions.resetAttachments();
    }

    handleDelete(attachment) {
        const {travel, step} = this.props;
        let travelId = travel ? travel['@id'] : null;
        let stepId = step['@id'];

        this.props.confirmActions.openConfirm('Voulez-vous vraiment supprimer ce fichier ?', 'Confirmation', () => {
            if(travelId && stepId) {
                this.props.attachmentsActions.deleteAttachment(travelId, stepId, attachment['@id']);
            }
        });
    }

    render() {
        const {isLoading, collection, travel, step} = this.props;
        const {items} = collection;

        return (
            <div className="attachments-container">
                {
                    isLoading ? (
                        <LoaderComponent/>
                    ) : ''
                }
                {
                    items && items.length > 0 ? (
                        <AttachmentsListComponent attachments={items}
                                                  travel={travel}
                                                  step={step}
                                                  handleDelete={this.handleDelete} />
                    ) : ''
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        travel: state.TravelReducer.travel,
        isLoading: state.AttachmentsReducer.isLoading,
        collection: state.AttachmentsReducer.collection,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        attachmentsActions: bindActionCreators(AttachmentsActions, dispatch, props),
        confirmActions: bindActionCreators(ConfirmActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentsContainer);