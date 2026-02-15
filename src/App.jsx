import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import ArcTrajViewer from './ArcTrajViewer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/viewer" element={
          <div className="min-h-screen bg-black text-white">
            <ArcTrajViewer />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
