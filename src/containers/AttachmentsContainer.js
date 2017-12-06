import React, {Component} from 'react';
import {connect} from "react-redux";
import LoaderComponent from "../components/LoaderComponent";
import AttachmentsListComponent from "../components/AttachmentsListComponent";
import {bindActionCreators} from "redux";

import * as AttachmentsActions from '../actions/AttachmentsActions';

class AttachmentsContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {travel, step} = this.props;

        this.props.attachmentsActions.fetchAttachments(travel['@id'], step['@id']);
    }

    componentWillUnmount() {
        this.props.attachmentsActions.resetAttachments();
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
                                                  step={step}/>
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
        attachmentsActions: bindActionCreators(AttachmentsActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentsContainer);