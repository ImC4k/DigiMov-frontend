import './App.css';

import Drawer from './Component/Drawer';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <BrowserRouter>
          <Drawer />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
