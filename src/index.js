import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App' 
import {BrowserRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux';
import rootReducer from './App/redux/reducers/rootReducer'
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const text = 'Hi hello chel'
const nav = {Main: '/', About: '/about', Contacts: '/contacts'}
const tel = ['+998999039083', '+998993634936']
const adress = ['Андижан','С.Альенда','6/12']


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const application = (
  <Provider store={store}>
    <BrowserRouter>
      <App nav={nav} tel={tel} adress={adress} text={text}/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
    application,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
