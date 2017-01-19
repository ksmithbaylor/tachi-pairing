import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { observe } from './store';

import './index.css';

observe((props) => ReactDOM.render(
  <App {...props} />,
  document.getElementById('root')
));
