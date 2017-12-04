import * as StepFormConstants from '../constants/StepFormConstants';

const initialState = {
    showModal: false,
    isLoading: false,
    step: null,
    type: null,
    values: {
        name: {
            value: '',
            error: null,
            validation: null,
        },
        dateStart: {
            value: '',
            error: null,
            validation: null,
        },
        dateEnd: {
            value: '',
            error: null,
            validation: null,
        },
        summary: {
            value: '',
            error: null,
            validation: null,
        },
        price: {
            value: 0,
            error: null,
            validation: null,
        },
        type: {
            value: '',
            error: null,
            validation: null,
        },
        company: {
            value: '',
            error: null,
            validation: null,
        },
        bookingNumber: {
            value: '',
            error: null,
            validation: null,
        },
        flightNumber: {
            value: '',
            error: null,
            validation: null,
        },
        openingLuggage: {
            value: '',
            error: null,
            validation: null,
        },
        closingLuggage: {
            value: '',
            error: null,
            validation: null,
        },
        seat: {
            value: '',
            error: null,
            validation: null,
        }
    },
};

export default (state = initialState, action) => {
    switch(action.type) {
        // LIST
        case StepFormConstants.OPEN_MODAL:
            return {
                ...state,
                showModal: true,
                type: action.stepType,
                values: initialState.values,
            };

        case StepFormConstants.CLOSE_MODAL:
            return {
                ...state,
                showModal: false
            };

        case StepFormConstants.UPDATE_VALUE:
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

        case StepFormConstants.SET_ERROR:
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

        default:
            return state;
    }
}