import React, { PureComponent } from 'react';
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

export default class TravelInfosComponent extends PureComponent {
    render() {
        const {onSubmit, onChange, values, isLoading} = this.props;
        
        return (
            <form onSubmit={onSubmit} >
                <FormGroup controlId="travelName" validationState={values.name.validation}>
                    <ControlLabel>Nom*</ControlLabel>
                    <FormControl type="text"
                                 placeholder="Mon super voyage"
                                 disabled={isLoading}
                                 value={values.name.value ? values.name.value : ''}
                                 name="name"
                                 onChange={onChange}
                    />
                    {values.name.error && <HelpBlock>{values.name.error}</HelpBlock>}
                </FormGroup>
                <FormGroup controlId="travelSummary" validationState={values.summary.validation}>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl componentClass="textarea"
                                 placeholder="Youpi, je pars en voyage ! Heureusement, TravelSheets m'accompagne ;)"
                                 disabled={isLoading}
                                 value={values.summary.value ? values.summary.value : ''}
                                 name="summary"
                                 onChange={onChange}
                    />
                    {values.summary.error && <HelpBlock>{values.summary.error}</HelpBlock>}
                </FormGroup>
                <FormGroup controlId="travelDateStart" validationState={values.dateStart.validation}>
                    <ControlLabel>Date de début*</ControlLabel>
                    <FormControl type="date"
                                 placeholder="dd/mm/yyyy"
                                 disabled={isLoading}
                                 value={values.dateStart.value ? values.dateStart.value : ''}
                                 name="dateStart"
                                 onChange={onChange}
                    />
                    {values.dateStart.error && <HelpBlock>{values.dateStart.error}</HelpBlock>}
                </FormGroup>
                <FormGroup controlId="travelDateEnd" validationState={values.dateEnd.validation}>
                    <ControlLabel>Date de fin</ControlLabel>
                    <FormControl type="date"
                                 placeholder="dd/mm/yyyy"
                                 disabled={isLoading}
                                 value={values.dateEnd.value ? values.dateEnd.value : ''}
                                 name="dateEnd"
                                 onChange={onChange}
                    />
                    {values.dateEnd.error && <HelpBlock>{values.dateEnd.error}</HelpBlock>}
                </FormGroup>
                <button style={{'display': 'none'}} type='submit' ref={ (button) => { this.button = button } } >Submit</button>
            </form>
        )
    }
}