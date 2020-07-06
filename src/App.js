import React from 'react';
import './App.css';
import StockDetail from './StockDetail';
import StockList from './StockList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      {/* <StockDetail ticker="TSLA"/> */}
      <StockList />
    </div>
  );
}

export default App;
