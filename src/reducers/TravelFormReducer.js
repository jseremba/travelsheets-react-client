import * as TravelFormConstants from '../constants/TravelFormConstants';

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
    },
    travel: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case TravelFormConstants.OPEN_MODAL:
            state.values = initialState.values;

            if(state.travel) {
                state.values.name.value = state.travel.name;
                state.values.summary.value = state.travel.summary;
                state.values.dateStart.value = state.travel.dateStart;
                state.values.dateEnd.value = state.travel.dateEnd;
            }

            return {
                ...state,
                showModal: true,
            };

        case TravelFormConstants.CLOSE_MODAL:
            return {
                ...state,
                showModal: false,
                values: initialState.values,
                isLoading: false,
            };

        case TravelFormConstants.UPDATE_VALUE:
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

        case TravelFormConstants.SET_ERROR:
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

        case TravelFormConstants.SAVE_REQUESTED:
            return {
                ...state,
                isLoading: true,
            };

        case TravelFormConstants.SAVE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                values: initialState.values,
                showModal: false,
            };

        case TravelFormConstants.SAVE_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        case TravelFormConstants.SET_TRAVEL:
            return {
                ...state,
                travel: action.travel
            };

        default:
            return state;
    }
}
