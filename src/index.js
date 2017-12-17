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

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
