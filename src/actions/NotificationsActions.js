import * as NotificationsConstants from '../constants/NotificationsConstants';

export const addNotification = (message, level = 'success') => {
    return dispatch => {
        dispatch({
            type: NotificationsConstants.ADD_NOTIFICATION,
            message,
            level,
        });
    }
};