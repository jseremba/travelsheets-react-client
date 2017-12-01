import * as TravelAddConstants from '../constants/TravelAddConstants';

const initialState = {
    showModal: false,
    travel: null
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

        default:
            return state;
    }
}
