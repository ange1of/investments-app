import React from 'react';
import './App.css';
import MainMenu from './MainMenu';
import Notification from './Notification'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.notificationsWebSocket = null;
        this.state = {
            notifications: [],
            currentKey: 0
        }
    }

    componentDidMount() {
        this.notificationsWebSocket = new WebSocket('ws://localhost:3001/api/notifications');
        this.notificationsWebSocket.onmessage = event => {
            const data = JSON.parse(event.data);
            this.setState((state) => {
                return {
                    notifications: [...state.notifications,
                        <Notification title={data.title} detail={data.detail} key={state.currentKey}/>
                    ],
                    currentKey: state.currentKey+1
                }
            });
        };
    }

    render() {
        return (
            <div className="App">
                <MainMenu />
                <div className="notificationBlock">
                    {this.state.notifications}
                </div>
            </div>
        );
    }
}

export default App;
