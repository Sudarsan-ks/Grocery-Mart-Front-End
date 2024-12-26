import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/user.css'
import './css/home.css'
import './css/cart.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.jsx";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
