import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';

import * as TravelActions from '../actions/TravelActions';
import * as TravelFormActions from '../actions/TravelFormActions';
import * as TravelDeleteActions from '../actions/TravelDeleteActions';

import LoaderComponent from '../components/LoaderComponent';
import TravelInfosComponent from "../components/TravelInfosComponent";
import StepsContainer from "./StepsContainer";
import TravelFormContainer from "./TravelFormContainer";
import TravelDeleteContainer from "./TravelDeleteContainer";

class TravelContainer extends Component {
    constructor(props) {
        super(props);

        this.openEditModal = this.openEditModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        if(id) {
            this.props.travelActions.fetchTravel(id);
        }
    }

    componentWillUnmount() {
        this.props.travelActions.setTravel(null);
    }

    openEditModal() {
        this.props.travelFormActions.openModal();
    }

    openDeleteModal() {
        this.props.travelDeleteActions.openModal();
    }

    render() {
        const {travel, isLoading} = this.props;

        return (
            <div className="travel-container">
                {isLoading ? <LoaderComponent/> : ''}
                {travel ? (
                    <Grid>
                        <PageHeader>{travel.name}</PageHeader>
                        <Row>
                            <Col md={4}>
                                <TravelInfosComponent travel={travel}
                                                      onEdit={this.openEditModal}
                                                      onDelete={this.openDeleteModal}/>
                            </Col>
                            <Col md={8}>
                                <StepsContainer travel={travel}/>
                            </Col>
                        </Row>
                        <TravelFormContainer travel={travel}/>
                        <TravelDeleteContainer travel={travel}/>
                    </Grid>
                ) : ''}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        travel: state.TravelReducer.travel,
        isLoading: state.TravelReducer.isLoading,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        travelActions: bindActionCreators(TravelActions, dispatch, props),
        travelFormActions: bindActionCreators(TravelFormActions, dispatch, props),
        travelDeleteActions: bindActionCreators(TravelDeleteActions, dispatch, props),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelContainer);