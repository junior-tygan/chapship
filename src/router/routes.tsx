import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Door from '../pages/Door/Index'
import Sea from '../pages/Sea/Index'
import Air from '../pages/Air/index'
import NotFound from '../pages/NotFound';
import Quote from '../pages/Quote/Index'

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Door" element={<Door />} />
        <Route path="/Sea" element={<Sea />} />
        <Route path="/Air" element={<Air />} />
        <Route path="/Quote" element={<Quote />} />
        {/* 404 Not Found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
