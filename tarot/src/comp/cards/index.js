import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Cards from './Cards.js';
import Test from './Test.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Cards />, document.getElementById('root'));
registerServiceWorker();
