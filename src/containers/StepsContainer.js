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
        this.props.stepFormActions.openModal(eventKey);
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
                        <StepsListComponent steps={steps}/>
                    ) : ''
                }
                <DropdownButton bsSize="small" title="Ajouter une étape&nbsp;" id="addStepButton">
                    <MenuItem eventKey="transportation" onSelect={this.handleAddStep}>Transport</MenuItem>
                    <MenuItem eventKey="accomodation" onSelect={this.handleAddStep}>Logement</MenuItem>
                    <MenuItem eventKey="tour" onSelect={this.handleAddStep}>Visite</MenuItem>
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