import React from 'react';
import './App.css';
import MainMenu from './MainMenu';
import Notification from './Notification'

function App() {
	return (
		<div className="App">
            <MainMenu />
            <div className="notificationBlock">
                <Notification 
                    title="Цена акций TSLA достигла 1200 $"
                    detail="Тут может быть написана дополнительная 
                            важная информация для трейдера"/>
                <Notification 
                    title="Акции YNDX начали расти"
                    detail="Тут может быть написана дополнительная 
                            важная информация для трейдера"/>
            </div>
        </div>
    );
}

export default App;
