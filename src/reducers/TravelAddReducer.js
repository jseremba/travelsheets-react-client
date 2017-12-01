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
                showModal: false,
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

        default:
            return state;
    }
}
