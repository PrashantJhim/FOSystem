import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter ,Route,Routes} from 'react-router-dom';
import './index.css';
import App from './App';
import SignUp from './sign'
import Login from './login'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<App/>}></Route>
      <Route path = "/Login" element={<Login/>}></Route>
      <Route path = "/SignUp" element ={<SignUp/>}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
