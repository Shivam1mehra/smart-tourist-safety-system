import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Container,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import {
  Security,
  Dashboard,
  LocationOn,
  Warning,
  People,
  Notifications,
  Logout,
  Emergency,
} from '@mui/icons-material';

const PoliceApp = ({ onLogout }) => {
  const [tourists, setTourists] = useState([
    { id: 'TSID-001', name: 'John Doe', location: 'Patna Museum', safetyScore: 85, status: 'safe', lastSeen: '2 mins ago' },
    { id: 'TSID-002', name: 'Alice Smith', location: 'Gandhi Maidan', safetyScore: 72, status: 'warning', lastSeen: '5 mins ago' },
    { id: 'TSID-003', name: 'Bob Johnson', location: 'Mahavir Mandir', safetyScore: 94, status: 'safe', lastSeen: '1 min ago' },
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, tourist: 'Alice Smith', message: 'Entered medium-risk area', severity: 'warning', time: '10:30 AM' },
    { id: 2, tourist: 'Unknown', message: 'SOS signal detected', severity: 'error', time: '10:15 AM' },
  ]);

  const [stats, setStats] = useState({
    totalTourists: 156,
    activeTourists: 89,
    safeZones: 12,
    activeAlerts: 3
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ background: 'linear-gradient(135deg, #1976D2 0%, #2196F3 100%)' }}>
        <Toolbar>
          <Security sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            🚔 Police Command Center
          </Typography>
          
          <IconButton color="inherit">
            <Badge badgeContent={alerts.length} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          
          <IconButton color="inherit" onClick={onLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, pt: 10, pb: 2, minHeight: '100vh', bgcolor: 'grey.50' }}>
        <Container maxWidth="xl">
          {/* Alert Banner */}
          {alerts.length > 0 && (
            <Alert severity="error" sx={{ mb: 3 }}>
              🚨 {alerts.length} active alert{alerts.length > 1 ? 's' : ''} requiring attention
            </Alert>
          )}

          {/* Statistics Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 3, textAlign: 'center', p: 2 }}>
                <CardContent>
                  <People sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {stats.totalTourists}
                  </Typography>
                  <Typography variant="body2">Total Tourists</Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 3, textAlign: 'center', p: 2 }}>
                <CardContent>
                  <LocationOn sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {stats.activeTourists}
                  </Typography>
                  <Typography variant="body2">Currently Active</Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 3, textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Dashboard sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="info.main">
                    {stats.safeZones}
                  </Typography>
                  <Typography variant="body2">Safe Zones</Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 3, textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Warning sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="error.main">
                    {stats.activeAlerts}
                  </Typography>
                  <Typography variant="body2">Active Alerts</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Active Tourists */}
            <Grid item xs={12} lg={8}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Active Tourists Monitoring
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Tourist ID</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Location</TableCell>
                          <TableCell>Safety Score</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tourists.map((tourist) => (
                          <TableRow key={tourist.id}>
                            <TableCell>{tourist.id}</TableCell>
                            <TableCell>{tourist.name}</TableCell>
                            <TableCell>{tourist.location}</TableCell>
                            <TableCell>
                              <Chip 
                                label={`${tourist.safetyScore}%`}
                                color={tourist.safetyScore > 80 ? 'success' : 'warning'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={tourist.status}
                                color={tourist.status === 'safe' ? 'success' : 'warning'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Button size="small" variant="outlined">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Alerts */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Recent Alerts
                  </Typography>
                  {alerts.map((alert) => (
                    <Card key={alert.id} variant="outlined" sx={{ mb: 2, p: 2 }}>
                      <Typography variant="subtitle2" color="error.main">
                        {alert.tourist}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {alert.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {alert.time}
                      </Typography>
                      <Button size="small" color="error" sx={{ mt: 1, display: 'block' }}>
                        Respond
                      </Button>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* Heat Map */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3, textAlign: 'center', minHeight: 300 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Tourist Activity Heat Map
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: 200,
                    bgcolor: 'grey.100',
                    borderRadius: 2
                  }}>
                    <Typography variant="body1" color="text.secondary">
                      Interactive heat map showing tourist density and safety zones would be displayed here
                    </Typography>
                  </Box>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    View Full Map
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default PoliceApp;
