import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as StepActions from '../actions/StepActions';
import * as StepFormActions from '../actions/StepFormActions';

import LoaderComponent from '../components/LoaderComponent';
import StepsListComponent from "../components/StepsListComponent";
import {DropdownButton, MenuItem} from "react-bootstrap";
import StepFormContainer from "./StepFormContainer";

class StepsContainer extends Component {
    constructor(props) {
        super(props);

        this.handleAddStep = this.handleAddStep.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    componentDidMount() {
        let travel = this.props.travel['@id'];
        if(travel) {
            this.props.stepActions.fetchSteps(travel);
        }
    }

    componentWillUnmount() {
        this.props.stepActions.setSteps();
    }

    handleAddStep(eventKey) {
        this.props.stepFormActions.openAddModal(eventKey);
    }

    onEdit(step) {
        this.props.stepFormActions.openEditModal(step);
        console.log("onEdit", step);
    }

    onDelete(step) {
        console.log("onDelete", step);
    }

    render() {
        const {collection, isLoading, travel} = this.props;

        let steps = collection.items;

        return (
            <div className="steps-container">
                {
                    isLoading ? (
                        <LoaderComponent/>
                    ) : ''
                }
                {
                    steps && steps.length > 0 ? (
                        <StepsListComponent steps={steps} onEdit={this.onEdit} onDelete={this.onDelete} />
                    ) : ''
                }
                <DropdownButton bsSize="small" title="Ajouter une étape&nbsp;" id="addStepButton">
                    <MenuItem eventKey="TransportationStep" onSelect={this.handleAddStep}>Transport</MenuItem>
                    <MenuItem eventKey="AccomodationStep" onSelect={this.handleAddStep}>Logement</MenuItem>
                    <MenuItem eventKey="TourStep" onSelect={this.handleAddStep}>Visite</MenuItem>
                </DropdownButton>

                <StepFormContainer travel={travel}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        collection: state.StepReducer.collection,
        isLoading: state.StepReducer.isLoading
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        stepActions: bindActionCreators(StepActions, dispatch, props),
        stepFormActions: bindActionCreators(StepFormActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepsContainer);