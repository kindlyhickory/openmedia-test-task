import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import App from './components/app/app';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('player-container-react'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
