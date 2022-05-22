import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';
import './scss/styles.scss';
import './scss/global.scss';
import App from './App';
import ThemeContextWrapper from './ThemeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from './pages/Feed/Feed';
import Message from './pages/Message/Message';
import Login from './authorization/Login';
import SignIn from './authorization/SignIn';
import SignUp from './authorization/SignUp';
import ResetPassword from './authorization/ResetPassword';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Settings from './components/Settings';
import AccountDetails from './components/AccountDetails';
import AddressDetails from './components/AddressDetails';
import SocialDetails from './components/SocialDetails';
import PasswordDetails from './components/PasswordDetails';

ReactDOM.render(
  <BrowserRouter>
    <ThemeContextWrapper>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Feed />} />
          <Route path="chat" element={<Message />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/info-account" element={<AccountDetails />} />
          <Route path="settings/address-info" element={<AddressDetails />} />
          <Route path="settings/social-info" element={<SocialDetails />} />
          <Route path="settings/change-password" element={<PasswordDetails />} />
        </Route>
        <Route path="/login" element={<Login />}>
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="resetPassword" element={<ResetPassword />} />
        </Route>
      </Routes>
      <ToastContainer />
    </ThemeContextWrapper>
  </BrowserRouter >,
  document.getElementById('root')
);
