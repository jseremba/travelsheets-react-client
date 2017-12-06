import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as StepActions from '../actions/StepActions';
import * as StepFormActions from '../actions/StepFormActions';
import * as ConfirmActions from '../actions/ConfirmActions';

import LoaderComponent from '../components/LoaderComponent';
import StepsListComponent from "../components/StepsListComponent";
import {DropdownButton, MenuItem} from "react-bootstrap";
import StepFormContainer from "./StepFormContainer";

class StepsContainer extends Component {
    constructor(props) {
        super(props);

        this.handleAddStep = this.handleAddStep.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
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

    handleSelect(activePanel) {
        this.props.stepActions.setActivePanel(activePanel);
    }

    onEdit(step) {
        this.props.stepFormActions.openEditModal(step);
    }

    onDelete(step) {
        const {travel} = this.props;
        let travelId;

        if(travel) {
            travelId = travel['@id'];
        }

        this.props.confirmActions.openConfirm('Voulez-vous vraiment supprimer cette étape ?', 'Confirmation', () => {
            if(travelId) {
                this.props.stepActions.deleteStep(step['@id'], travelId);
            }
        });
    }

    render() {
        const {collection, isLoading, travel, activePanel} = this.props;

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
                        <StepsListComponent steps={steps}
                                            onEdit={this.onEdit}
                                            onDelete={this.onDelete}
                                            handleSelect={this.handleSelect}
                                            activePanel={activePanel}/>
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
        isLoading: state.StepReducer.isLoading,
        activePanel: state.StepReducer.activePanel,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        stepActions: bindActionCreators(StepActions, dispatch, props),
        stepFormActions: bindActionCreators(StepFormActions, dispatch, props),
        confirmActions: bindActionCreators(ConfirmActions, dispatch, props),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepsContainer);