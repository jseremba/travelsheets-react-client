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
            if(action.step) {
                action.stepType = action.step['@type'];
            }

            state = {
                ...state,
                showModal: true,
                type: action.stepType,
                values: initialState.values,
                step: action.step ? action.step : initialState.step,
            };

            if(state.step) {
                for(let key in state.step) {
                    if(state.step.hasOwnProperty(key) && state.values[key] !== undefined) {
                        state = {
                            ...state,
                            values: {
                                ...state.values,
                                [key]: {
                                    ...state.values[key],
                                    value: state.step[key],
                                }
                            }
                        }
                    }
                }
            }

            return state;

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

        case StepFormConstants.SAVE_REQUESTED:
            return {
                ...state,
                isLoading: true,
            };

        case StepFormConstants.SAVE_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        case StepFormConstants.SAVE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showModal: false,
            };

        default:
            return state;
    }
}