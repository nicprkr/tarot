import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Stickers from './Stickers';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Stickers />, document.getElementById('root'));
registerServiceWorker();
