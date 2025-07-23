import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Divider,
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
  Chip,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { ContainerCreateData, SeedType } from '../../../shared/types/containers';
import { useTenants } from '../../../shared/hooks';
import { containerApi } from '../../../shared/utils';

interface CreateContainerPanelProps {
  onClose: () => void;
  onSuccess: () => void;
}

const seedTypeOptions: SeedType[] = [
  { id: '1', name: 'Lettuce', variety: 'Butterhead' },
  { id: '2', name: 'Lettuce', variety: 'Romaine' },
  { id: '3', name: 'Kale', variety: 'Curly' },
  { id: '4', name: 'Spinach' },
  { id: '5', name: 'Basil' },
  { id: '6', name: 'Cilantro' },
];

export const CreateContainerPanel: React.FC<CreateContainerPanelProps> = ({
  onClose,
  onSuccess,
}) => {
  const { tenants } = useTenants();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<ContainerCreateData>({
    name: '',
    type: 'physical',
    tenant: '',
    purpose: 'development',
    seed_types: [],
    location: undefined,
    notes: '',
    settings: {
      shadow_service_enabled: false,
      robotics_simulation_enabled: false,
      ecosystem: undefined,
    },
    environment: {},
  });

  const [connectEcosystem, setConnectEcosystem] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        city: prev.location?.city || '',
        country: prev.location?.country || '',
        [field]: value,
      },
    }));
  };

  const handleSettingsChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const submitData = { ...formData };
      if (formData.type === 'virtual') {
        submitData.location = undefined;
      }
      
      await containerApi.createContainer(submitData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create container');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={true}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: 500 } }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Create Container</Typography>
          <Button onClick={onClose} startIcon={<CloseIcon />}>
            Close
          </Button>
        </Box>

        {error && (
          <Box sx={{ mb: 2, p: 2, bgcolor: 'error.light', color: 'error.contrastText', borderRadius: 1 }}>
            {error}
          </Box>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Container Information
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Container Name"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Tenant</InputLabel>
              <Select
                value={formData.tenant}
                label="Tenant"
                onChange={(e) => handleInputChange('tenant', e.target.value)}
              >
                {tenants.map((tenant) => (
                  <MenuItem key={tenant.id} value={tenant.name}>
                    {tenant.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              Container Type
            </Typography>
            <ToggleButtonGroup
              value={formData.type}
              exclusive
              onChange={(_, value) => value && handleInputChange('type', value)}
              fullWidth
            >
              <ToggleButton value="physical">Physical</ToggleButton>
              <ToggleButton value="virtual">Virtual</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Purpose</InputLabel>
              <Select
                value={formData.purpose}
                label="Purpose"
                onChange={(e) => handleInputChange('purpose', e.target.value)}
              >
                <MenuItem value="development">Development</MenuItem>
                <MenuItem value="research">Research</MenuItem>
                <MenuItem value="production">Production</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={seedTypeOptions}
              getOptionLabel={(option) => `${option.name}${option.variety ? ` (${option.variety})` : ''}`}
              value={formData.seed_types}
              onChange={(_, value) => handleInputChange('seed_types', value)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={`${option.name}${option.variety ? ` (${option.variety})` : ''}`}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Seed Types"
                  placeholder="Select seed types"
                />
              )}
            />
          </Grid>

          {formData.type === 'physical' && (
            <>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="City"
                  required
                  value={formData.location?.city || ''}
                  onChange={(e) => handleLocationChange('city', e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Country"
                  required
                  value={formData.location?.country || ''}
                  onChange={(e) => handleLocationChange('country', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={formData.location?.address || ''}
                  onChange={(e) => handleLocationChange('address', e.target.value)}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={3}
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Container Settings
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.settings.shadow_service_enabled}
                  onChange={(e) => handleSettingsChange('shadow_service_enabled', e.target.checked)}
                />
              }
              label="Enable Shadow Service"
            />
          </Grid>

          {formData.type === 'virtual' && (
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.settings.robotics_simulation_enabled || false}
                    onChange={(e) => handleSettingsChange('robotics_simulation_enabled', e.target.checked)}
                  />
                }
                label="Run Robotics Simulation"
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={connectEcosystem}
                  onChange={(e) => setConnectEcosystem(e.target.checked)}
                />
              }
              label="Connect to other systems"
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading || !formData.name || !formData.tenant}
                fullWidth
              >
                {loading ? 'Creating...' : connectEcosystem ? 'Create and Connect' : 'Create Container'}
              </Button>
              <Button variant="outlined" onClick={onClose} fullWidth>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};
