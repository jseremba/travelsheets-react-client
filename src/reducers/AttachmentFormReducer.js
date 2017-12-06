import * as AttachmentFormConstants from "../constants/AttachmentFormConstants";

const initialState = {
    showModal: false,
    isLoading: false,
    values: {
        name: {
            value: '',
            validation: null,
            error: null,
        },
        file: {
            value: '',
            validation: null,
            error: null,
        }
    },
    step: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AttachmentFormConstants.OPEN_MODAL:
            return {
                ...state,
                showModal: true,
                step: action.step,
                values: initialState.values,
            };

        case AttachmentFormConstants.CLOSE_MODAL:
            return {
                ...state,
                showModal: false,
            };

        case AttachmentFormConstants.UPDATE_VALUE:
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.name]: {
                        ...state.values[action.name],
                        value: action.value,
                        error: null,
                        validation: null,
                    }
                }
            };

        case AttachmentFormConstants.SET_ERROR:
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.name]: {
                        ...state.values[action.name],
                        error: action.error,
                        validation: action.validation,
                    }
                }
            };

        case AttachmentFormConstants.ADD_REQUESTED:
            return {
                ...state,
                isLoading: true,
            };

        case AttachmentFormConstants.ADD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showModal: false,
            };

        case AttachmentFormConstants.ADD_FAILURE:
            return {
                ...state,
                isLoading: false,
                showModal: false,
            };

        default:
            return state;
    }
}