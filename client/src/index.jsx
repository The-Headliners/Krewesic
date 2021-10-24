import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import GlobalStyle from './components/styles/globalStyles.jsx';

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>
  , document.getElementById('app')
);
