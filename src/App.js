import React from 'react';
import './App.css';
import StockDetail from './StockDetail';
import StockList from './StockList';
import SectorList from './SectorList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <StockDetail ticker="TSLA"/>
      {/* <StockList /> */}
      {/* <SectorList /> */}
    </div>
  );
}

export default App;
