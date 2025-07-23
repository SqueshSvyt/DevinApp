import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton
} from '@mui/material';
import {
  ArrowBack,
  Settings,
  Nature,
  Inventory,
  DeviceHub,
  Warning,
  CheckCircle,
  Schedule,
  TrendingUp
} from '@mui/icons-material';
import { Container as ContainerType } from '../../../shared/types/containers';
import { LoadingSpinner, ErrorMessage, StatusChip } from '../../../shared/components';
import { apiService } from '../../../shared/utils';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`container-tabpanel-${index}`}
      aria-labelledby={`container-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const ContainerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [container, setContainer] = useState<ContainerType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchContainer = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await apiService.getContainer(id);
        setContainer(data);
      } catch (err) {
        setError('Failed to load container details');
      } finally {
        setLoading(false);
      }
    };

    fetchContainer();
  }, [id]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!container) return <ErrorMessage message="Container not found" />;

  const mockCrops = [
    {
      id: '1',
      seedType: 'Lettuce - Buttercrunch',
      seedDate: '2024-01-15',
      transplantingDate: '2024-01-22',
      harvestingDate: '2024-02-15',
      age: 25,
      status: 'growing',
      overdueDays: 0
    },
    {
      id: '2',
      seedType: 'Spinach - Baby Leaf',
      seedDate: '2024-01-18',
      transplantingDate: '2024-01-25',
      harvestingDate: '2024-02-18',
      age: 22,
      status: 'transplanted',
      overdueDays: 2
    }
  ];

  const mockActivities = [
    {
      id: '1',
      timestamp: '2024-01-20 14:30',
      action: 'Nutrient solution adjusted',
      user: 'John Doe',
      details: 'pH adjusted to 6.2, EC to 1.8'
    },
    {
      id: '2',
      timestamp: '2024-01-19 09:15',
      action: 'Crop transplanted',
      user: 'Jane Smith',
      details: '24 lettuce seedlings moved to growing panels'
    }
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => window.history.back()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1">
          {container.name}
        </Typography>
        <StatusChip status={container.status} />
        {container.alerts && container.alerts.length > 0 && (
          <Chip
            icon={<Warning />}
            label={`${container.alerts.length} Alert${container.alerts.length > 1 ? 's' : ''}`}
            color="warning"
            size="small"
          />
        )}
      </Box>

      <Paper sx={{ width: '100%', mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab icon={<Settings />} label="Overview" />
            <Tab icon={<Nature />} label="Environment & Recipes" />
            <Tab icon={<Inventory />} label="Inventory" />
            <Tab icon={<DeviceHub />} label="Devices" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Container Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Type:</Typography>
                      <Typography>{container.type}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Tenant:</Typography>
                      <Typography>{container.tenant_id}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Purpose:</Typography>
                      <Typography>{container.purpose}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Location:</Typography>
                      <Typography>
                        {container.location ? `${container.location.city}, ${container.location.country}` : 'Not set'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Created:</Typography>
                      <Typography>{new Date(container.created_at).toLocaleDateString()}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance Metrics
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TrendingUp color="primary" />
                      <Typography>Yield: {container.metrics?.yield || 'N/A'} kg</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle color="success" />
                      <Typography>Space Utilization: {container.metrics?.spaceUtilization || 'N/A'}%</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Schedule color="info" />
                      <Typography>Avg Growth Cycle: {container.metrics?.avgGrowthCycle || 'N/A'} days</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Activity
                  </Typography>
                  <List>
                    {mockActivities.map((activity) => (
                      <ListItem key={activity.id}>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.action}
                          secondary={`${activity.timestamp} - ${activity.user} - ${activity.details}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Environment Settings
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Temperature:</Typography>
                      <Typography>{container.environment?.temperature || 'N/A'}°C</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Humidity:</Typography>
                      <Typography>{container.environment?.humidity || 'N/A'}%</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">CO2 Level:</Typography>
                      <Typography>{container.environment?.co2Level || 'N/A'} ppm</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Light Intensity:</Typography>
                      <Typography>{container.environment?.lightIntensity || 'N/A'} μmol/m²/s</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Nutrient Recipe
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">pH Level:</Typography>
                      <Typography>{container.environment?.phLevel || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">EC Level:</Typography>
                      <Typography>{container.environment?.ecLevel || 'N/A'} mS/cm</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Nitrogen:</Typography>
                      <Typography>{container.environment?.nitrogen || 'N/A'} ppm</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Phosphorus:</Typography>
                      <Typography>{container.environment?.phosphorus || 'N/A'} ppm</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Crops Inventory
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Seed Type</TableCell>
                      <TableCell>Seed Date</TableCell>
                      <TableCell>Transplanting Date</TableCell>
                      <TableCell>Harvesting Date</TableCell>
                      <TableCell>Age (days)</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Overdue Days</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockCrops.map((crop) => (
                      <TableRow key={crop.id}>
                        <TableCell>{crop.seedType}</TableCell>
                        <TableCell>{crop.seedDate}</TableCell>
                        <TableCell>{crop.transplantingDate}</TableCell>
                        <TableCell>{crop.harvestingDate}</TableCell>
                        <TableCell>{crop.age}</TableCell>
                        <TableCell>
                          <StatusChip status={crop.status} />
                        </TableCell>
                        <TableCell>
                          {crop.overdueDays > 0 ? (
                            <Chip label={crop.overdueDays} color="warning" size="small" />
                          ) : (
                            '-'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Connected Devices
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Temperature Sensor"
                        secondary="Status: Online - Last reading: 22.5°C"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Humidity Sensor"
                        secondary="Status: Online - Last reading: 65%"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Warning color="warning" />
                      </ListItemIcon>
                      <ListItemText
                        primary="pH Sensor"
                        secondary="Status: Warning - Calibration needed"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    System Status
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Shadow Service:</Typography>
                      <Chip
                        label={container.settings?.shadowServiceEnabled ? 'Enabled' : 'Disabled'}
                        color={container.settings?.shadowServiceEnabled ? 'success' : 'default'}
                        size="small"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Ecosystem Connected:</Typography>
                      <Chip
                        label={container.settings?.ecosystemConnected ? 'Connected' : 'Disconnected'}
                        color={container.settings?.ecosystemConnected ? 'success' : 'error'}
                        size="small"
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
};
