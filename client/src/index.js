import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from 'App';
import Root from 'Root';

ReactDOM.render(
  <Root>
    <Router>
      <App />
    </Router>
  </Root>
  , document.querySelector('#root'));