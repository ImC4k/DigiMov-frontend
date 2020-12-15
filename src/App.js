import './App.css';

import Drawer from './Component/Drawer';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Test modal
import MovieInfoModal from './Component/MovieInfoModal';
import Modal from '@material-ui/core/Modal';
// Test modal

function App() {
  // Test modal
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Test modal

  return (
    <div className='App'>
      <header className='App-header'>
        <BrowserRouter>
          <Drawer />
          {/* Test modal */}
          <button type='button' onClick={handleOpen}>
            Open Modal
          </button>
          <Modal open={open} onClose={handleClose}>
            <div>
              <MovieInfoModal />
            </div>
          </Modal>
          {/* Test modal */}
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
