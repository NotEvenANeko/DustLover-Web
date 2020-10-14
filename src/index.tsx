import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { Provider as BusProvider } from './hooks/useBus'
import './index.css';
import store from './redux'
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BusProvider>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BusProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
