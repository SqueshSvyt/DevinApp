import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ContainerDashboard } from '../features/containers/ContainerDashboard';
import { ContainerDetailPage } from '../features/containers/components/ContainerDetailPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ContainerDashboard />} />
      <Route path="/containers" element={<ContainerDashboard />} />
      <Route path="/containers/:id" element={<ContainerDetailPage />} />
    </Routes>
  );
};
