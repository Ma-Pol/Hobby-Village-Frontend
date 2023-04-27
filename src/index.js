import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="/test1" element={<Test1 />} /> */}
      {/* <Route path="/test2" element={<Test2 />} /> */}
    </Routes>
  </BrowserRouter>
);
