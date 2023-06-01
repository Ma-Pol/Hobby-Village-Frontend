import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserMain from './pages/user-main/UserMain';
import UserLogin from './pages/user-users/UserLogin';
import UserSignup from './pages/user-users/UserSignup';
import UserModify from './pages/user-users/UserModify';
import Recommend from './pages/user-recommend/Recommend';
import UserGuide from './pages/user-guide/UserGuide';
import UserMyPages from './pages/user-mypage/UserMyPages';
import UserCarts from './pages/user-cartsNdibs/UserCarts';
import UserDibs from './pages/user-cartsNdibs/UserDibs';
import UserReviews from './pages/user-reviews/UserReviews';
import UserProducts from './pages/user-products/UserProducts';
import Purchase from './pages/user-purchase/Purchase';
import UserRequests from './pages/user-request/UserRequests';
import UserNotices from './pages/user-notices/UserNotices';
import UserCs from './pages/user-cs/UserCs';
import Admin from './pages/Admin';
import React from 'react';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<UserMain />} />
      <Route exact path="/login" element={<UserLogin />} />
      <Route exact path="/signup" element={<UserSignup />} />
      <Route exact path="/users/:email/modify" element={<UserModify />} />
      <Route exact path="/recommend/*" element={<Recommend />} />
      <Route exact path="/guide" element={<UserGuide />} />
      <Route exact path="/mypages/:email/*" element={<UserMyPages />} />
      <Route
        exact
        path="/carts/:email/lists/:category"
        element={<UserCarts />}
      />
      <Route exact path="/dibs/:email/lists/:category" element={<UserDibs />} />
      <Route exact path="/reviews/*" element={<UserReviews />} />
      <Route exact path="/products/*" element={<UserProducts />} />
      <Route exact path="/purchase" element={<Purchase />} />
      <Route exact path="/requests" element={<UserRequests />} />
      <Route exact path="/notices/*" element={<UserNotices />} />
      <Route exact path="/cs/*" element={<UserCs />} />
      <Route exact path="/m/*" element={<Admin />} />
      <Route
        path="*"
        element={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              fontSize: '3rem',
            }}
          >
            에러페이지
          </div>
        }
      />
    </Routes>
  </BrowserRouter>
);
