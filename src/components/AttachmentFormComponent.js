import React from 'react';
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import UploadFileContainer from "../containers/UploadFileContainer";

export default class AttachmentFormComponent extends React.PureComponent {
    render() {
        const {onSubmit, onChange, values, isLoading} = this.props;

        return (
            <form onSubmit={onSubmit} >
                <FormGroup controlId="attachmentName" validationState={values.name.validation}>
                    <ControlLabel>Nom*</ControlLabel>
                    <FormControl type="text"
                                 placeholder="Nouveau fichier"
                                 disabled={isLoading}
                                 value={values.name.value ? values.name.value : ''}
                                 name="name"
                                 onChange={onChange}/>
                    {values.name.error && <HelpBlock>{values.name.error}</HelpBlock>}
                </FormGroup>
                <FormGroup controlId="attachmentFile" validationState={values.file.validation}>
                    <ControlLabel>Fichier*</ControlLabel>
                    <UploadFileContainer onUploadFinish={(file) => {onChange(file['@id'], 'file')}}
                                         onLoading={() => {
                                             onChange('loading', 'file')}}/>
                    {values.file.error && <HelpBlock>{values.file.error}</HelpBlock>}
                </FormGroup>
                <button style={{'display': 'none'}} type='submit' ref={ (button) => { this.button = button } } >Submit</button>
            </form>
        );
    }
}