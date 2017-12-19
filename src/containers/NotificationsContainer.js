import React, {Component} from 'react';
import {connect} from "react-redux";
import Notifications from 'react-notification-system-redux';

class NotificationsContainer extends Component {
    render() {
        const style = {
            NotificationItem: { // Override the notification item
                DefaultStyle: { // Applied to every notification, regardless of the notification level
                    margin: '10px 5px 2px 1px',
                    color: '#FFFFFF',
                    border: '1px solid',
                    borderRadius: '0.25rem',
                    boxShadow: 'none'
                },
                success: {
                    backgroundColor: '#18bc9c',
                    borderColor: '#18bc9c',
                },
                error: {
                    backgroundColor: '#E74C3C',
                    borderColor: '#E74C3C',
                },
                warning: {
                    backgroundColor: '#F39C12',
                    borderColor: '#F39C12',
                },
                info: {
                    backgroundColor: '#3498DB',
                    borderColor: '#3498DB',
                }
            },
            Title: {
                DefaultStyle: {
                    fontSize: '19px',
                    fontWeight: 'normal',
                    color: '#FFFFFF',
                },
            },
            Dismiss: {
                DefaultStyle: {
                    backgroundColor: 'none',
                    opacity: '0.4',
                    padding: '12px 20px',
                    top: 0,
                    right: 0
                }
            },
            Action: {
                DefaultStyle: {
                    backgroundColor: '#2C3E50',
                    color: '#FFFFFF',
                    borderRadius: '4px',
                    padding: '6px 12px',
                }
            }
        };

        const {notifications} = this.props;

        return (
            <Notifications notifications={notifications} style={style} />
        );
    }
}

const mapStateToProps = state => {
    return {
        notifications: state.notifications
    };
};

export default connect(mapStateToProps)(NotificationsContainer);