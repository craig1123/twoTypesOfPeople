import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Provider from 'react-redux/lib/components/Provider';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store';
import { initialState } from './redux/reducer';
import './index.css';

const store = configureStore(initialState);

// const css = 'text-shadow: -1px -1px hsl(125, 100%, 20%), 1px 1px hsl(125, 100%, 25%), 3px 2px hsl(125, 100%, 30%), 5px 3px hsl(125, 100%, 35%), 7px 4px hsl(125, 100%, 40%), 9px 5px hsl(125, 100%, 45%), 11px 6px hsl(125, 100%, 50%); font-size: 50px; color: rgb(203, 23, 47);';

// console.log('%c Two Types of People ', css);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
