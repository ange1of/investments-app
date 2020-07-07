import React, { useState } from 'react';
import './MainMenu.css';
import StockList from './StockList';
import SectorList from './SectorList';

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSection: null
        }
        this.openStockList = this.openStockList.bind(this);
        this.openSectorList = this.openSectorList.bind(this);
        this.openMainMenu = this.openMainMenu.bind(this);
    }

    openStockList() {
        this.setState({ openSection: <StockList />});
    }

    openSectorList() {
        this.setState({ openSection: <SectorList />});
    }

    openMainMenu() {
        this.setState({ openSection: null});
    }
    
    render() {
        if (this.state.openSection) {
            return [
                <div className="openMainMenu" onClick={this.openMainMenu} key="openMainMenu">
                    <svg width="20" height="20">
                        <polygon points="18,0 14,0 0,10 14,20 18,20 4,10" fill="black"/>
                    </svg>
                </div>,
                this.state.openSection
            ];
        }
        return (
            <div className="MainMenu">
                <div className="mainMenuItem" onClick={this.openStockList}>
                    <h3>Список акций</h3>
                </div>
                <div className="mainMenuItem" onClick={this.openSectorList}>
                    <h3>Отраслевые индексы</h3>
                </div>
            </div>
        );
    }

    
}

export default MainMenu;