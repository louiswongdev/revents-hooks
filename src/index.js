import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';

import './app/layout/styles.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-calendar/dist/Calendar.css';

import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/layout/ScrollToTop';
import { loadEvents } from './features/events/eventActions';

const rootEl = document.getElementById('root');

const store = configureStore();

store.dispatch(loadEvents());

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </Provider>,
    rootEl,
  );
}

if (module.hot) {
  module.hot.accept('./app/layout/App', function () {
    setTimeout(render);
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
