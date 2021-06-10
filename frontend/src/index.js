import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers/rootReducer'
import App from './App';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import PruebaLucas from './pages/PruebaLucas';

const myStore = createStore(rootReducer , applyMiddleware(thunk))


ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,

  document.getElementById('root')
);