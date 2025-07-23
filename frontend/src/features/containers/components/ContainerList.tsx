import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Warning as WarningIcon,
  Computer as ComputerIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';
import { Container } from '../../../shared/types/containers';
import { formatDate, getStatusColor } from '../../../shared/utils';
import { LoadingSpinner, ErrorMessage } from '../../../shared/components';

interface ContainerListProps {
  containers: Container[];
  loading: boolean;
  error: string | null;
  onCreateContainer: () => void;
  onEditContainer: (container: Container) => void;
  onRefresh: () => void;
}

export const ContainerList: React.FC<ContainerListProps> = ({
  containers,
  loading,
  error,
  onCreateContainer,
  onEditContainer,
  onRefresh,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, container: Container) => {
    setAnchorEl(event.currentTarget);
    setSelectedContainer(container);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedContainer(null);
  };

  const handleEdit = () => {
    if (selectedContainer) {
      onEditContainer(selectedContainer);
    }
    handleMenuClose();
  };

  const getTypeIcon = (type: string) => {
    return type === 'physical' ? <StorageIcon /> : <ComputerIcon />;
  };

  const getLocationText = (container: Container) => {
    if (container.type === 'physical' && container.location) {
      return `${container.location.city}, ${container.location.country}`;
    }
    return '-';
  };

  if (loading) {
    return <LoadingSpinner message="Loading containers..." />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={onRefresh} />;
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Container List</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onCreateContainer}
          >
            Create Container
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Tenant</TableCell>
                <TableCell>Purpose</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Modified</TableCell>
                <TableCell>Alerts</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {containers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((container) => (
                  <TableRow key={container.id} hover>
                    <TableCell>
                      <Tooltip title={container.type}>
                        {getTypeIcon(container.type)}
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {container.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{container.tenant}</TableCell>
                    <TableCell>
                      <Chip
                        label={container.purpose}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{getLocationText(container)}</TableCell>
                    <TableCell>
                      <Chip
                        label={container.status}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(container.status),
                          color: 'white',
                        }}
                      />
                    </TableCell>
                    <TableCell>{formatDate(container.created)}</TableCell>
                    <TableCell>{formatDate(container.modified)}</TableCell>
                    <TableCell>
                      {container.has_alert && (
                        <Tooltip title="Container has active alerts">
                          <WarningIcon color="error" />
                        </Tooltip>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(e) => handleMenuClick(e, container)}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={containers.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[10, 25, 50]}
        />

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleMenuClose}>View</MenuItem>
          <MenuItem onClick={handleMenuClose}>Shutdown</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};
