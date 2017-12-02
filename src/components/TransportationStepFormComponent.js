import React, {PureComponent} from "react";
import {ControlLabel, FormControl, FormGroup, Glyphicon, HelpBlock, InputGroup} from "react-bootstrap";

export default class TransportationStepFormComponent extends PureComponent {
    render() {
        const {onSubmit, onChange, values, isLoading} = this.props;
        
        return (
            <form onSubmit={onSubmit} >
                <FormGroup controlId="stepName" validationState={values.name.validation}>
                    <ControlLabel>Nom*</ControlLabel>
                    <FormControl type="text"
                                 placeholder="Nouvelle étape"
                                 disabled={isLoading}
                                 value={values.name.value ? values.name.value : ''}
                                 name="name"
                                 onChange={onChange}
                    />
                    {values.name.error && <HelpBlock>{values.name.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepDateStart" validationState={values.dateStart.validation}>
                    <ControlLabel>Départ le*</ControlLabel>
                    <FormControl type="datetime"
                                 placeholder="dd/mm/yyyy hh:mm"
                                 disabled={isLoading}
                                 value={values.dateStart.value ? values.dateStart.value : ''}
                                 name="dateStart"
                                 onChange={onChange}
                    />
                    {values.dateStart.error && <HelpBlock>{values.dateStart.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepDateEnd" validationState={values.dateEnd.validation}>
                    <ControlLabel>Arrivée le*</ControlLabel>
                    <FormControl type="datetime"
                                 placeholder="dd/mm/yyyy hh:mm"
                                 disabled={isLoading}
                                 value={values.dateEnd.value ? values.dateEnd.value : ''}
                                 name="dateEnd"
                                 onChange={onChange}
                    />
                    {values.dateEnd.error && <HelpBlock>{values.dateEnd.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepSummary" validationState={values.summary.validation}>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl componentClass="textarea"
                                 placeholder="Cette étape sera super !"
                                 disabled={isLoading}
                                 value={values.summary.value ? values.summary.value : ''}
                                 name="summary"
                                 onChange={onChange}
                    />
                    {values.summary.error && <HelpBlock>{values.summary.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepPrice" validationState={values.price.validation}>
                    <ControlLabel>Prix</ControlLabel>
                    <InputGroup>
                        <FormControl type="number"
                                     placeholder="0.00"
                                     disabled={isLoading}
                                     value={values.price.value ? values.price.value : ''}
                                     name="price"
                                     onChange={onChange}
                        />
                        <InputGroup.Addon>
                            <Glyphicon glyph="euro" />
                        </InputGroup.Addon>
                    </InputGroup>
                    {values.price.error && <HelpBlock>{values.price.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepType">
                    <ControlLabel>Type de transport</ControlLabel>
                    <FormControl componentClass="select"
                                 disabled={isLoading}
                                 name="type"
                                 onChange={onChange}
                                 value={values.type.value}
                    >
                        <option value="" disabled>-- Choisir le type --</option>
                        <option value="plane">Avion</option>
                        <option value="boat">Bateau</option>
                        <option value="car">Voiture</option>
                        <option value="train">Train</option>
                        <option value="taxi">Taxi / VTC</option>
                        <option value="bike">Vélo</option>
                        <option value="subway">Transports en commun</option>
                        <option value="other">Autre</option>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="stepCompany" validationState={values.company.validation}>
                    <ControlLabel>Compagnie</ControlLabel>
                    <FormControl type="text"
                                 placeholder="Air France"
                                 disabled={isLoading}
                                 value={values.company.value ? values.company.value : ''}
                                 name="company"
                                 onChange={onChange}
                    />
                    {values.company.error && <HelpBlock>{values.company.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepBookingNumber" validationState={values.bookingNumber.validation}>
                    <ControlLabel>Numéro de réservation</ControlLabel>
                    <FormControl type="text"
                                 placeholder="A3456CFF456"
                                 disabled={isLoading}
                                 value={values.bookingNumber.value ? values.bookingNumber.value : ''}
                                 name="bookingNumber"
                                 onChange={onChange}
                    />
                    {values.bookingNumber.error && <HelpBlock>{values.bookingNumber.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepFlightNumber" validationState={values.flightNumber.validation}>
                    <ControlLabel>Numéro du vol, train ou bateau</ControlLabel>
                    <FormControl type="text"
                                 placeholder="A3456CFF456"
                                 disabled={isLoading}
                                 value={values.flightNumber.value ? values.flightNumber.value : ''}
                                 name="flightNumber"
                                 onChange={onChange}
                    />
                    {values.flightNumber.error && <HelpBlock>{values.flightNumber.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepOpeningLuggage" validationState={values.openingLuggage.validation}>
                    <ControlLabel>Ouverture de l'enregistrement des bagages</ControlLabel>
                    <FormControl type="time"
                                 placeholder="hh:mm"
                                 disabled={isLoading}
                                 value={values.openingLuggage.value ? values.openingLuggage.value : ''}
                                 name="openingLuggage"
                                 onChange={onChange}
                    />
                    {values.openingLuggage.error && <HelpBlock>{values.openingLuggage.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepClosingLuggage" validationState={values.closingLuggage.validation}>
                    <ControlLabel>Fermeture de l'enregistrement des bagages</ControlLabel>
                    <FormControl type="time"
                                 placeholder="hh:mm"
                                 disabled={isLoading}
                                 value={values.closingLuggage.value ? values.closingLuggage.value : ''}
                                 name="closingLuggage"
                                 onChange={onChange}
                    />
                    {values.closingLuggage.error && <HelpBlock>{values.closingLuggage.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepSeat" validationState={values.seat.validation}>
                    <ControlLabel>Sièges</ControlLabel>
                    <FormControl type="text"
                                 placeholder="A34, E45"
                                 disabled={isLoading}
                                 value={values.seat.value ? values.seat.value : ''}
                                 name="seat"
                                 onChange={onChange}
                    />
                    {values.seat.error && <HelpBlock>{values.seat.error}</HelpBlock>}
                </FormGroup>

                <button style={{'display': 'none'}} type='submit' ref={ (button) => { this.button = button } } >Submit</button>
            </form>
        )
    }
}