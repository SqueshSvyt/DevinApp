import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ContainerDashboard } from '../features/containers/ContainerDashboard';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ContainerDashboard />} />
      <Route path="/containers" element={<ContainerDashboard />} />
    </Routes>
  );
};
