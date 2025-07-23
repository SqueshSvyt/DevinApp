import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { SearchFilterSection } from './components/SearchFilterSection';
import { PerformanceOverview } from './components/PerformanceOverview';
import { ContainerList } from './components/ContainerList';
import { CreateContainerPanel } from './components/CreateContainerPanel';
import { EditContainerPanel } from './components/EditContainerPanel';
import { useContainers } from '../../shared/hooks';
import { Container as ContainerType, ContainerFilters } from '../../shared/types/containers';

export const ContainerDashboard: React.FC = () => {
  const [filters, setFilters] = useState<ContainerFilters>({
    search: '',
    type: '',
    tenant: '',
    purpose: '',
    status: '',
    hasAlerts: false
  });
  
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [editingContainer, setEditingContainer] = useState<ContainerType | null>(null);
  
  const { containers, loading, error, refetch } = useContainers(filters);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Container Management Dashboard
      </Typography>
      
      <SearchFilterSection 
        filters={filters}
        onFiltersChange={setFilters}
      />
      
      <PerformanceOverview 
        containers={containers}
        onTypeFilter={(type) => setFilters(prev => ({ ...prev, type }))}
      />
      
      <ContainerList
        containers={containers}
        loading={loading}
        error={error}
        onCreateContainer={() => setShowCreatePanel(true)}
        onEditContainer={setEditingContainer}
        onRefresh={refetch}
      />
      
      {showCreatePanel && (
        <CreateContainerPanel
          onClose={() => setShowCreatePanel(false)}
          onSuccess={refetch}
        />
      )}
      
      {editingContainer && (
        <EditContainerPanel
          container={editingContainer}
          onClose={() => setEditingContainer(null)}
          onSuccess={refetch}
        />
      )}
    </Container>
  );
};
