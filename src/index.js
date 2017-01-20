import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { init, observe } from './store';

import './index.css';

observe((props) => ReactDOM.render(
  <App {...props} />,
  document.getElementById('root')
));

init();
