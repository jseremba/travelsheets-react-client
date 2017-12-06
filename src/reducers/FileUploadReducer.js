import * as FileUploadConstants from '../constants/FileUploadConstants';

const initialState = {
    isLoading: false,
    file: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FileUploadConstants.UPLOAD_REQUESTED:
            return {
                ...state,
                isLoading: true,
            };

        case FileUploadConstants.UPLOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                file: action.file,
            };

        case FileUploadConstants.UPLOAD_FAILED:
            return {
                ...state,
                isLoading: false,
            };

        case FileUploadConstants.RESET_VALUE:
            console.log('RESET_VALUE');
            return {
                ...initialState,
            };

        default:
            return state;
    }
}