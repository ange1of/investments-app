import React from 'react';
import './Notification.css';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
        this.closeNotification = this.closeNotification.bind(this);
    }

    componentDidMount() {
        setTimeout(this.closeNotification, 4000);
    }

    closeNotification() {
        this.setState({ open: false });
    }

    render() {
        if (!this.state.open) {
            return '';
        }
        return (
            <div className="Notification" style={this.state.styleObject}>
                <div className="closeButton" onClick={this.closeNotification}>
                    <code>[x]</code>
                </div>
                <h5>{this.props.title}</h5>
                {this.props.detail ? 
                <p className="notificationDetail"><code>{this.props.detail}</code></p> : ''}
            </div>
        );
    }
}

export default Notification;