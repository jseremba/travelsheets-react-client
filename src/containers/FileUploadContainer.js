import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, FormControl, Glyphicon, InputGroup} from "react-bootstrap";

import * as FileUploadActions from '../actions/FileUploadActions';

class FileUploadContainer extends Component {
    constructor(props) {
        super(props);

        this.handleUploadFile = this.handleUploadFile.bind(this);
    }

    componentDidMount() {}

    componentWillUnmount() {
        this.props.fileUploadActions.resetValue();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isLoading && nextProps.isLoading !== this.props.isLoading) {
            if(this.props.onLoading && typeof this.props.onLoading === 'function') {
                this.props.onLoading();
            }
        }

        if(nextProps.file) {
            if(!this.props.file || this.props.file['@id'] !== nextProps.file['@id']) {
                if(this.props.onUploadFinish && typeof this.props.onUploadFinish === 'function') {
                    this.props.onUploadFinish(nextProps.file);
                }
            }
        }
    }

    handleUploadFile(e) {
        const data = new FormData();

        data.append('file', e.target.files[0]);

        this.props.fileUploadActions.uploadFile(data, e.target.value);
    }

    render() {
        const {isLoading, file} = this.props;

        return (
            <InputGroup>
                <FormControl type="text"
                             disabled={isLoading}
                             value={file ? file.originalFilename : ''}
                             readOnly/>
                <label className="input-group-btn">
                    <span className="btn btn-default">
                        {
                            isLoading ? (
                                <Glyphicon glyph="repeat"/>
                            ) : (
                                'Choisir...'
                            )
                        }
                        <FormControl type="file"
                                     ref="uploadFileInput"
                                     onChange={this.handleUploadFile}
                                     style={{display: 'none'}}
                                     disabled={isLoading} />
                    </span>
                </label>
            </InputGroup>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.FileUploadReducer.isLoading,
        file: state.FileUploadReducer.file,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fileUploadActions: bindActionCreators(FileUploadActions, dispatch, props),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadContainer);