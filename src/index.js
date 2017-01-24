import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { observe, init } from './store';

import './index.css';

observe((props) => ReactDOM.render(
  <App {...props} />,
  document.getElementById('root')
));

init();
