import React from 'react';
import {Button, ControlLabel, FormControl, FormGroup, Glyphicon, HelpBlock} from "react-bootstrap";

export default class LoginFormComponent extends React.PureComponent {
    render() {
        const {state, onChange, onSubmit} = this.props;

        return (
            <form onSubmit={onSubmit}>
                <FormGroup controlId="loginEmail" validationState={state.email.validation}>
                    <ControlLabel>Email*</ControlLabel>
                    <FormControl type="email"
                                 placeholder="example@domain.com"
                                 disabled={state.submitted}
                                 value={state.email.value ? state.email.value : ''}
                                 name="email"
                                 onChange={onChange}
                    />
                    {state.email.error && <HelpBlock>{state.email.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="loginPassword" validationState={state.password.validation}>
                    <ControlLabel>Mot de passe*</ControlLabel>
                    <FormControl type="password"
                                 placeholder="•••••••••"
                                 disabled={state.submitted}
                                 value={state.password.value ? state.password.value : ''}
                                 name="password"
                                 onChange={onChange}
                    />
                    {state.password.error && <HelpBlock>{state.password.error}</HelpBlock>}
                </FormGroup>

                <Button type="submit" disabled={state.submitted} bsStyle="success">{state.submitted ? (<Glyphicon glyph="repeat"/>) : 'Connexion'}</Button>
            </form>
        );
    }
}