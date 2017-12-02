import * as NotificationsConstants from '../constants/NotificationsConstants';

const initialState = {
    notifications: [],
};

export default (state = initialState, action) => {
    switch(action.type) {
        case NotificationsConstants.ADD_NOTIFICATION:
            state.notifications.push({
                'message': action.message,
                'level': action.level,
            });
            return state;

        default:
            return state;
    }
}