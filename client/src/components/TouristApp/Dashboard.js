import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Badge,
  Paper,
  Divider,
  Button,
} from '@mui/material';
import {
  Shield,
  LocationOn,
  Warning,
  CheckCircle,
  Info,
  Emergency,
  Notifications,
  TravelExplore,
  Security,
  Phone,
  AccessTime,
  Person,
  Place,
} from '@mui/icons-material';

const Dashboard = ({ userProfile, safetyScore, alerts, location }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getSafetyScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const getSafetyScoreText = (score) => {
    if (score >= 80) return 'Very Safe';
    if (score >= 60) return 'Moderately Safe';
    return 'Caution Required';
  };

  const nearbyPlaces = [
    { name: 'Gandhi Maidan', distance: '2.3 km', safety: 'high', type: 'Tourist Spot' },
    { name: 'Patna Museum', distance: '3.1 km', safety: 'high', type: 'Museum' },
    { name: 'Mahavir Mandir', distance: '1.8 km', safety: 'medium', type: 'Religious Site' },
    { name: 'Patna Police Station', distance: '0.8 km', safety: 'high', type: 'Emergency' }
  ];

  const recentActivities = [
    { time: '10:30 AM', activity: 'Entered safe zone - Gandhi Maidan', type: 'info' },
    { time: '09:45 AM', activity: 'Location updated successfully', type: 'success' },
    { time: '09:30 AM', activity: 'Safety score updated: 85%', type: 'success' },
    { time: '09:15 AM', activity: 'Morning check-in completed', type: 'info' }
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Welcome Card */}
        <Grid item xs={12}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent sx={{ p: 3 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar sx={{ 
                    width: 60, 
                    height: 60, 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    fontSize: 24,
                    fontWeight: 'bold'
                  }}>
                    {userProfile?.name?.charAt(0) || 'T'}
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h5" fontWeight="bold">
                    Welcome, {userProfile?.name || 'Tourist'}!
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Digital ID: {userProfile?.digitalId?.slice(-8) || 'XXXXXXXX'} | 
                    Current Time: {currentTime.toLocaleTimeString()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Chip
                    icon={<Shield />}
                    label={`${safetyScore}% Safe`}
                    color={getSafetyScoreColor(safetyScore)}
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 'bold',
                      '& .MuiChip-icon': { color: 'white' }
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Safety Score Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Shield sx={{ 
                fontSize: 48, 
                color: `${getSafetyScoreColor(safetyScore)}.main`,
                mb: 1 
              }} />
              <Typography variant="h4" fontWeight="bold" color={`${getSafetyScoreColor(safetyScore)}.main`}>
                {safetyScore}%
              </Typography>
              <Typography variant="h6" gutterBottom>
                Safety Score
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {getSafetyScoreText(safetyScore)}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={safetyScore} 
                color={getSafetyScoreColor(safetyScore)}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Location Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <LocationOn sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Current Location
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                Patna, Bihar
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lat: {location.lat.toFixed(4)}<br />
                Lng: {location.lng.toFixed(4)}
              </Typography>
              <Button 
                size="small" 
                sx={{ mt: 1 }}
                startIcon={<TravelExplore />}
              >
                View on Map
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Weather Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h3" fontWeight="bold" color="warning.main">
                {weatherData.temperature}°C
              </Typography>
              <Typography variant="h6" gutterBottom>
                {weatherData.condition}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Humidity: {weatherData.humidity}%<br />
                Good conditions for travel
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Alerts */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Notifications sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  Recent Alerts
                </Typography>
                <Badge badgeContent={alerts.length} color="error" sx={{ ml: 'auto' }}>
                  <IconButton size="small">
                    <Warning />
                  </IconButton>
                </Badge>
              </Box>
              
              {alerts.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    No active alerts. You're all good!
                  </Typography>
                </Box>
              ) : (
                <List dense>
                  {alerts.slice(-3).map((alert) => (
                    <ListItem key={alert.id} sx={{ px: 0 }}>
                      <ListItemIcon>
                        {alert.severity === 'error' && <Warning color="error" />}
                        {alert.severity === 'warning' && <Warning color="warning" />}
                        {alert.severity === 'info' && <Info color="info" />}
                      </ListItemIcon>
                      <ListItemText 
                        primary={alert.message}
                        secondary={new Date().toLocaleTimeString()}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Nearby Places */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Place sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  Nearby Places
                </Typography>
              </Box>
              
              <List dense>
                {nearbyPlaces.map((place, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <LocationOn color={place.safety === 'high' ? 'success' : place.safety === 'medium' ? 'warning' : 'error'} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={place.name}
                      secondary={`${place.distance} • ${place.type}`}
                    />
                    <Chip 
                      size="small" 
                      label={place.safety} 
                      color={place.safety === 'high' ? 'success' : place.safety === 'medium' ? 'warning' : 'error'}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Phone />}
                    sx={{ py: 1.5 }}
                  >
                    Call Emergency
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<LocationOn />}
                    sx={{ py: 1.5 }}
                  >
                    Share Location
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Security />}
                    sx={{ py: 1.5 }}
                  >
                    Report Issue
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<TravelExplore />}
                    sx={{ py: 1.5 }}
                  >
                    Plan Route
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Activity Log */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTime sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  Recent Activity
                </Typography>
              </Box>
              
              <List dense>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        {activity.type === 'info' && <Info color="info" />}
                        {activity.type === 'success' && <CheckCircle color="success" />}
                        {activity.type === 'warning' && <Warning color="warning" />}
                      </ListItemIcon>
                      <ListItemText 
                        primary={activity.activity}
                        secondary={activity.time}
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
