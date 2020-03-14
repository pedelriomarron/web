import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './css/tailwind.css'
import './css/style.css'
import './css/footer.css'
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter basename={"/web"}><App /></BrowserRouter>,
    document.getElementById('root') as HTMLElement
);


serviceWorker.unregister();
