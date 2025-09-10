import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Switch,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import {
  AdminPanelSettings,
  Dashboard,
  Analytics,
  Settings,
  People,
  Security,
  SmartToy,
  Logout,
  TrendingUp,
  Storage,
  Memory,
  NetworkCheck,
} from '@mui/icons-material';

const AdminApp = ({ onLogout }) => {
  const [systemStatus, setSystemStatus] = useState({
    aiModel: { status: 'active', performance: 94 },
    blockchain: { status: 'syncing', performance: 87 },
    geofencing: { status: 'active', performance: 98 },
    database: { status: 'active', performance: 91 }
  });

  const systemStats = {
    totalUsers: 1247,
    activeSessions: 89,
    totalAlerts: 156,
    safetyScore: 88
  };

  const recentActivities = [
    { action: 'New tourist registered', time: '2 mins ago', type: 'info' },
    { action: 'Geo-fence updated for Gandhi Maidan', time: '15 mins ago', type: 'success' },
    { action: 'AI model retrained', time: '1 hour ago', type: 'info' },
    { action: 'Emergency alert resolved', time: '2 hours ago', type: 'success' }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ background: 'linear-gradient(135deg, #F57C00 0%, #FF9800 100%)' }}>
        <Toolbar>
          <AdminPanelSettings sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            ⚙️ Admin Control Panel
          </Typography>
          
          <IconButton color="inherit" onClick={onLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, pt: 10, pb: 2, minHeight: '100vh', bgcolor: 'grey.50' }}>
        <Container maxWidth="xl">
          {/* System Overview */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 3, textAlign: 'center', p: 2 }}>
                <CardContent>
                  <People sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {systemStats.totalUsers}
                  </Typography>
                  <Typography variant="body2">Total Users</Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 3, textAlign: 'center', p: 2 }}>
                <CardContent>
                  <NetworkCheck sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {systemStats.activeSessions}
                  </Typography>
                  <Typography variant="body2">Active Sessions</Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 3, textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Security sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="warning.main">
                    {systemStats.totalAlerts}
                  </Typography>
                  <Typography variant="body2">Total Alerts</Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 3, textAlign: 'center', p: 2 }}>
                <CardContent>
                  <TrendingUp sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="info.main">
                    {systemStats.safetyScore}%
                  </Typography>
                  <Typography variant="body2">System Health</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* System Status */}
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    System Component Status
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body1">AI Safety Model</Typography>
                      <Chip label={systemStatus.aiModel.status} color="success" size="small" />
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={systemStatus.aiModel.performance} 
                      color="success"
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Performance: {systemStatus.aiModel.performance}%
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body1">Blockchain Network</Typography>
                      <Chip label={systemStatus.blockchain.status} color="warning" size="small" />
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={systemStatus.blockchain.performance} 
                      color="warning"
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Sync: {systemStatus.blockchain.performance}%
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body1">Geo-fencing Service</Typography>
                      <Chip label={systemStatus.geofencing.status} color="success" size="small" />
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={systemStatus.geofencing.performance} 
                      color="success"
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Accuracy: {systemStatus.geofencing.performance}%
                    </Typography>
                  </Box>

                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body1">Database Cluster</Typography>
                      <Chip label={systemStatus.database.status} color="success" size="small" />
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={systemStatus.database.performance} 
                      color="success"
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Health: {systemStatus.database.performance}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* System Controls */}
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    System Controls
                  </Typography>
                  
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText 
                        primary="Emergency Mode" 
                        secondary="Override all safety protocols"
                      />
                      <Switch color="error" />
                    </ListItem>
                    <Divider />
                    
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText 
                        primary="Real-time Tracking" 
                        secondary="Enable GPS tracking for all users"
                      />
                      <Switch defaultChecked color="primary" />
                    </ListItem>
                    <Divider />
                    
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText 
                        primary="AI Analysis" 
                        secondary="Automatic anomaly detection"
                      />
                      <Switch defaultChecked color="success" />
                    </ListItem>
                    <Divider />
                    
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText 
                        primary="Geo-fence Alerts" 
                        secondary="Zone boundary notifications"
                      />
                      <Switch defaultChecked color="warning" />
                    </ListItem>
                  </List>

                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button variant="contained" color="primary" fullWidth>
                      Update Geo-fences
                    </Button>
                    <Button variant="outlined" color="secondary" fullWidth>
                      System Backup
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Activities */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Recent System Activities
                  </Typography>
                  
                  <List>
                    {recentActivities.map((activity, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemText 
                          primary={activity.action}
                          secondary={activity.time}
                        />
                        <Chip 
                          label={activity.type}
                          color={activity.type === 'success' ? 'success' : 'info'}
                          size="small"
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Button variant="contained" sx={{ mt: 2 }}>
                    View All Activities
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Analytics Dashboard */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3, textAlign: 'center', minHeight: 300 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    System Analytics Dashboard
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: 200,
                    bgcolor: 'grey.100',
                    borderRadius: 2,
                    mb: 2
                  }}>
                    <Typography variant="body1" color="text.secondary">
                      Advanced analytics charts and metrics would be displayed here<br />
                      Including user behavior patterns, safety trends, and system performance
                    </Typography>
                  </Box>
                  <Button variant="contained" startIcon={<Analytics />}>
                    Open Full Analytics
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

export default AdminApp;
