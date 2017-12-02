import * as StepFormConstants from '../constants/StepFormConstants';

const initialState = {
    showModal: false,
    isLoading: false,
    step: null,
    values: {},
};

export default (state = initialState, action) => {
    switch(action.type) {
        // LIST
        case StepFormConstants.OPEN_MODAL:
            return {
                ...state,
                showModal: true
            };

        case StepFormConstants.CLOSE_MODAL:
            return {
                ...state,
                showModal: false
            };

        default:
            return state;
    }
}