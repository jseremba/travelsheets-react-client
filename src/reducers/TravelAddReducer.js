import * as TravelAddConstants from '../constants/TravelAddConstants';

const initialState = {
    showModal: false,
    isLoading: false,
    values: {
        name: {
            value: '',
            error: null,
            validation: null,
        },
        summary: {
            value: '',
            error: null,
            validation: null,
        },
        dateStart: {
            value: '',
            error: '',
            validation: null,
        },
        dateEnd: {
            value: '',
            error: null,
            validation: null,
        },
    }
};

export default (state = initialState, action) => {
    switch(action.type) {
        case TravelAddConstants.OPEN_MODAL:
            return {
                ...state,
                showModal: true,
            };

        case TravelAddConstants.CLOSE_MODAL:
            return {
                ...state,
                values: initialState.values,
                showModal: false,
                isLoading: false,
            };

        case TravelAddConstants.UPDATE_VALUE:
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

        case TravelAddConstants.SET_ERROR:
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

        case TravelAddConstants.SAVE_REQUESTED:
            return {
                ...state,
                isLoading: true,
            };

        case TravelAddConstants.SAVE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                values: initialState.values,
                showModal: false,
            };

        case TravelAddConstants.SAVE_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
}
