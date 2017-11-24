import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

import * as TravelActions from '../actions/TravelActions';

import LoaderComponent from '../components/LoaderComponent';
import TravelInfosComponent from "../components/TravelInfosComponent";
import StepsContainer from "./StepsContainer";

class TravelContainer extends Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        if(id) {
            this.props.travelActions.fetchTravel(id);
        }
    }

    render() {
        const {travel, isLoading} = this.props;

        return (
            isLoading ? (
                <LoaderComponent/>
            ) : (
                <Grid>
                    <PageHeader>{travel.name}</PageHeader>
                    <Row>
                        <Col md={4}>
                            <TravelInfosComponent travel={travel}/>
                        </Col>
                        <Col md={8}>
                            <StepsContainer travel={travel}/>
                        </Col>
                    </Row>
                </Grid>
            )
        );
    }
}

const mapStateToProps = state => {
    return {
        travel: state.TravelReducer.travel,
        isLoading: state.TravelReducer.isLoading
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        travelActions: bindActionCreators(TravelActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelContainer);