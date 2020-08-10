import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';

import './app/layout/styles.css';
import 'semantic-ui-css/semantic.min.css';

const rootEl = document.getElementById('root');

function render() {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
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
