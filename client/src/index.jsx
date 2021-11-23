import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
// import GlobalStyle from './components/styles/globalStyles.jsx';
// import ColorBlind from './components/styles/colorBlind.jsx';
import {Switch} from '@mui/material';
//Need an event handler and state so when a Switch is used, render a new component that will target diffrenet content of the webpage


ReactDOM.render(
  <React.Fragment>
    
    <App switch={Switch}/>
  </React.Fragment>
  , document.getElementById('app')
);
