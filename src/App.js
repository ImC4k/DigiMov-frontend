import './App.css';

import Drawer from './Component/Drawer';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Test modal
import MovieInfoModal from './Component/MovieInfoModal';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
  const top = 40;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 200,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
// Test modal

function App() {
  // Test modal
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = <div style={modalStyle} className={classes.paper}></div>;
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
             <div><MovieInfoModal /></div>
          </Modal>
          {/* Test modal */}
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
