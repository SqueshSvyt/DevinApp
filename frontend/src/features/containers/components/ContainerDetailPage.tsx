import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Breadcrumbs,
  Link,
  ButtonGroup,
  Button
} from '@mui/material';
import {
  Settings,
  Nature,
  Inventory,
  DeviceHub,
  Warning,
  CheckCircle,
  Thermostat,
  Opacity,
  Air,
  Agriculture,
  Dashboard
} from '@mui/icons-material';
import { Container as ContainerType } from '../../../shared/types/containers';
import { LoadingSpinner, ErrorMessage, StatusChip } from '../../../shared/components';
import { containerApi } from '../../../shared/utils';
import { MetricCard } from './MetricCard';

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
  const navigate = useNavigate();
  const [container, setContainer] = useState<ContainerType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('Week');

  useEffect(() => {
    const fetchContainer = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await containerApi.getContainer(id);
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
  if (error) return <ErrorMessage error={error} />;
  if (!container) return <ErrorMessage error="Container not found" />;

  const mockCrops = [
    {
      id: '1',
      seedType: 'Salanova Cousteau',
      cultivationArea: 40,
      nurseryTable: 30,
      lastSD: '2025-01-30',
      lastTD: '2025-01-30',
      lastHD: '--',
      avgAge: 26,
      overdue: 2
    },
    {
      id: '2',
      seedType: 'Kiribati',
      cultivationArea: 50,
      nurseryTable: 20,
      lastSD: '2025-01-30',
      lastTD: '2025-01-30',
      lastHD: '--',
      avgAge: 30,
      overdue: 0
    },
    {
      id: '3',
      seedType: 'Rex Butterhead',
      cultivationArea: 65,
      nurseryTable: 10,
      lastSD: '2025-01-10',
      lastTD: '2025-01-20',
      lastHD: '2025-01-01',
      avgAge: 22,
      overdue: 0
    },
    {
      id: '4',
      seedType: 'Lollo Rossa',
      cultivationArea: 35,
      nurseryTable: 25,
      lastSD: '2025-01-15',
      lastTD: '2025-01-20',
      lastHD: '2025-05-02',
      avgAge: 18,
      overdue: 11
    }
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 2 }}>
        <Breadcrumbs>
          <Link 
            component="button" 
            variant="body1" 
            onClick={() => navigate('/containers')}
            sx={{ textDecoration: 'none' }}
          >
            Container Dashboard
          </Link>
          <Typography color="text.primary">{container.name}</Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h4" component="h1">
          {container.name}
        </Typography>
        <Chip 
          label={container.type} 
          color={container.type === 'physical' ? 'primary' : 'secondary'}
          size="small"
        />
        <Chip label={container.tenant} variant="outlined" size="small" />
        <Chip label={container.purpose} variant="outlined" size="small" />
        <StatusChip status={container.status} />
        {container.has_alert && (
          <Chip
            icon={<Warning />}
            label="Alert"
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
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Container Metrics</Typography>
              <ButtonGroup size="small">
                {['Week', 'Month', 'Quarter', 'Year'].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? 'contained' : 'outlined'}
                    onClick={() => setTimeRange(range)}
                  >
                    {range}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2}>
                <MetricCard
                  title="Air Temperature"
                  value="20"
                  unit="°C"
                  color="info"
                  icon={<Thermostat />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <MetricCard
                  title="Rel. Humidity"
                  value="65"
                  unit="%"
                  color="primary"
                  icon={<Opacity />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <MetricCard
                  title="CO₂ Level"
                  value="860"
                  unit="ppm"
                  color="warning"
                  icon={<Air />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <MetricCard
                  title="Yield"
                  value="51"
                  unit="KG"
                  color="success"
                  icon={<Agriculture />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <MetricCard
                  title="Nursery Station Utilization"
                  value="75"
                  unit="%"
                  color="secondary"
                  icon={<Dashboard />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <MetricCard
                  title="Cultivation Area Utilization"
                  value="90"
                  unit="%"
                  color="success"
                  icon={<Dashboard />}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>Crops</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>SEED TYPE</TableCell>
                    <TableCell align="center">CULTIVATION AREA</TableCell>
                    <TableCell align="center">NURSERY TABLE</TableCell>
                    <TableCell>LAST SD</TableCell>
                    <TableCell>LAST TD</TableCell>
                    <TableCell>LAST HD</TableCell>
                    <TableCell align="center">AVG AGE</TableCell>
                    <TableCell align="center">OVERDUE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockCrops.map((crop) => (
                    <TableRow key={crop.id}>
                      <TableCell>{crop.seedType}</TableCell>
                      <TableCell align="center">{crop.cultivationArea}</TableCell>
                      <TableCell align="center">{crop.nurseryTable}</TableCell>
                      <TableCell>{crop.lastSD}</TableCell>
                      <TableCell>{crop.lastTD}</TableCell>
                      <TableCell>{crop.lastHD}</TableCell>
                      <TableCell align="center">{crop.avgAge}</TableCell>
                      <TableCell align="center">
                        {crop.overdue > 0 ? (
                          <Chip 
                            label={crop.overdue} 
                            color={crop.overdue > 5 ? 'error' : 'warning'} 
                            size="small" 
                          />
                        ) : (
                          <Chip 
                            label="0" 
                            color="success" 
                            size="small" 
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Container Information & Settings
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Type:</Typography>
                      <Typography>{container.type}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Tenant:</Typography>
                      <Typography>{container.tenant}</Typography>
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
                      <Typography>{new Date(container.created).toLocaleDateString()}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Activity
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Nutrient solution adjusted"
                        secondary="2024-01-20 14:30 - John Doe - pH adjusted to 6.2, EC to 1.8"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Crop transplanted"
                        secondary="2024-01-19 09:15 - Jane Smith - 24 lettuce seedlings moved to growing panels"
                      />
                    </ListItem>
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
                      <Typography>{container.environment?.air_temperature || 'N/A'}°C</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Humidity:</Typography>
                      <Typography>{container.environment?.humidity || 'N/A'}%</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">CO2 Level:</Typography>
                      <Typography>{container.environment?.co2 || 'N/A'} ppm</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Light Intensity:</Typography>
                      <Typography>N/A μmol/m²/s</Typography>
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
                      <Typography>N/A</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">EC Level:</Typography>
                      <Typography>N/A mS/cm</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Nitrogen:</Typography>
                      <Typography>N/A ppm</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Phosphorus:</Typography>
                      <Typography>N/A ppm</Typography>
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
                      <TableCell>SEED TYPE</TableCell>
                      <TableCell align="center">CULTIVATION AREA</TableCell>
                      <TableCell align="center">NURSERY TABLE</TableCell>
                      <TableCell>LAST SD</TableCell>
                      <TableCell>LAST TD</TableCell>
                      <TableCell>LAST HD</TableCell>
                      <TableCell align="center">AVG AGE</TableCell>
                      <TableCell align="center">OVERDUE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockCrops.map((crop) => (
                      <TableRow key={crop.id}>
                        <TableCell>{crop.seedType}</TableCell>
                        <TableCell align="center">{crop.cultivationArea}</TableCell>
                        <TableCell align="center">{crop.nurseryTable}</TableCell>
                        <TableCell>{crop.lastSD}</TableCell>
                        <TableCell>{crop.lastTD}</TableCell>
                        <TableCell>{crop.lastHD}</TableCell>
                        <TableCell align="center">{crop.avgAge}</TableCell>
                        <TableCell align="center">
                          {crop.overdue > 0 ? (
                            <Chip 
                              label={crop.overdue} 
                              color={crop.overdue > 5 ? 'error' : 'warning'} 
                              size="small" 
                            />
                          ) : (
                            <Chip 
                              label="0" 
                              color="success" 
                              size="small" 
                            />
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
                        label="Disabled"
                        color="default"
                        size="small"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Ecosystem Connected:</Typography>
                      <Chip
                        label="Disconnected"
                        color="error"
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
