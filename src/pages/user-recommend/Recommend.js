import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Question from './Question';
import Result from './Result';
import UserHeader from '../../components/UserHeader';
import UserFooter from '../../components/UserFooter';

const Recommend = () => {
  return (
    <>
      <UserHeader />
      <Routes>
        <Route exact path="home" element={<Home />} />
        <Route exact path="question" element={<Question />} />
        <Route exact path="result" element={<Result />} />
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
      <UserFooter />
    </>
  );
};

export default Recommend;
