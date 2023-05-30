import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Recommend.css';
import Home from './Home';
import Question from './Question';
import Result from './Result';

const Recommend = () => {
  return (
    <>
      <Routes>
        <Route exact path="home" element={<Home/>}/>
        <Route exact path="question" element={<Question/>}/>
        <Route exact path="result" element={<Result/>}/>
      </Routes>
    </>
  );
};

export default Recommend;
