import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import ArcTrajViewer from './ArcTrajViewer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<ArcTrajViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
