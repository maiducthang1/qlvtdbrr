import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Login from './views/Login';
import Home from './views/Home'
import VatTu from './views/VatTu.jsx'
import PhieuNhap from './views/PhieuNhap.jsx'
import CTPN from './views/CTPN.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
<script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Login />} />
        <Route path="/trangchu" element={<Home />} />
        <Route path="/vattu" element={<VatTu />} />
        <Route path="/phieunhap" element={< PhieuNhap />} />
        <Route path="/chitietphieunhap" element={< CTPN />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
