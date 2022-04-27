import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { store, persistor } from "./Redux/Store"

//加载全局常量及方法
import "./Common/RequestUtils"

// 通用CSS
import "./index.css"

import Message from 'Components/Common/Message'
import { PersistGate } from 'redux-persist/integration/react';
import Dialog from 'Components/Common/Dialog';
import { initTimers } from './AppTimers'

window.message = Message;
window.dialog = Dialog;

// 添加定时器
initTimers()

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);
