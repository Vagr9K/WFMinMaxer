import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { EnemyStats } from 'views';
import getStore from 'store/create';
import './index.scss';
import './theme.global.scss';

const store = getStore();


const App = () => (
  <EnemyStats />
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
