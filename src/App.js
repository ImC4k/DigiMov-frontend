import './App.css';

import Drawer from './Component/Drawer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, {Component} from 'react';
import routes from './routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Drawer/>
          <Switch>
            {
              routes.map(route => 
                <Route key={route.name} path={route.path} component={route.component} exact />
              )
            }
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
