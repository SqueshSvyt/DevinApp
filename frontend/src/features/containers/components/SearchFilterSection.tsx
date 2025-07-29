import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  Grid,
} from '@mui/material';
import { ContainerFilters } from '../../../shared/types/containers';
import { useTenants } from '../../../shared/hooks';

interface SearchFilterSectionProps {
  filters: ContainerFilters;
  onFiltersChange: (filters: ContainerFilters) => void;
}

export const SearchFilterSection: React.FC<SearchFilterSectionProps> = ({
  filters,
  onFiltersChange,
}) => {
  const { tenants } = useTenants();

  const handleFilterChange = (key: keyof ContainerFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      type: '',
      tenant: '',
      purpose: '',
      status: '',
      hasAlerts: false,
    });
  };

  return (
    <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
      <Grid container spacing={2} alignItems="center" wrap="nowrap">
        <Grid item md={3}>
          <TextField
            fullWidth
            label="Search"
            placeholder="Search containers..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            size="small"
          />
        </Grid>
        
        <Grid item md={1.5}>
          <FormControl fullWidth size="small">
            <InputLabel>Type</InputLabel>
            <Select
              value={filters.type}
              label="Type"
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="physical">Physical</MenuItem>
              <MenuItem value="virtual">Virtual</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={1.5}>
          <FormControl fullWidth size="small">
            <InputLabel>Tenant</InputLabel>
            <Select
              value={filters.tenant}
              label="Tenant"
              onChange={(e) => handleFilterChange('tenant', e.target.value)}
            >
              <MenuItem value="">All Tenants</MenuItem>
              {tenants.map((tenant) => (
                <MenuItem key={tenant.id} value={tenant.name}>
                  {tenant.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={1.5}>
          <FormControl fullWidth size="small">
            <InputLabel>Purpose</InputLabel>
            <Select
              value={filters.purpose}
              label="Purpose"
              onChange={(e) => handleFilterChange('purpose', e.target.value)}
            >
              <MenuItem value="">All Purposes</MenuItem>
              <MenuItem value="development">Development</MenuItem>
              <MenuItem value="research">Research</MenuItem>
              <MenuItem value="production">Production</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={1.5}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label="Status"
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="created">Created</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={2}>
          <FormControlLabel
            control={
              <Switch
                checked={filters.hasAlerts}
                onChange={(e) => handleFilterChange('hasAlerts', e.target.checked)}
                size="small"
              />
            }
            label="Alerts Only"
            sx={{ whiteSpace: 'nowrap' }}
          />
        </Grid>

        <Grid item md={1}>
          <Button
            onClick={clearFilters}
            size="small"
            fullWidth
            sx={{
              backgroundColor: '#f5f5f5',
              color: '#000000',
              border: '1px solid #d0d0d0',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            CLEAR
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
