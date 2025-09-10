import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Card,
  CardContent,
  Button,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  Chip,
  Avatar,
  Grid,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  AccountCircle,
  LocationOn,
  Security,
  Language,
  Logout,
  Emergency,
  Notifications,
  Shield,
  PersonPin,
  Warning,
  CheckCircle,
  WifiOff,
  GPS,
} from '@mui/icons-material';
import Registration from './Registration';
import Dashboard from './Dashboard';
import SafetyScore from './SafetyScore';
import LocationTracker from './LocationTracker';
import DigitalID from './DigitalID';
import OfflineGuide from './OfflineGuide';

const TouristApp = ({ onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [userRegistered, setUserRegistered] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [safetyScore, setSafetyScore] = useState(85);
  const [alerts, setAlerts] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [location, setLocation] = useState({ lat: 25.6093, lng: 85.1376 }); // Example: Patna, Bihar
  const [emergencyDialog, setEmergencyDialog] = useState(false);

  useEffect(() => {
    // Check if user is already registered
    const savedProfile = localStorage.getItem('touristProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      setUserRegistered(true);
    }

    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Simulate location updates and safety analysis
    const locationInterval = setInterval(() => {
      // Simulate GPS updates
      setLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));

      // Simulate safety score updates based on location
      const newScore = 75 + Math.random() * 20;
      setSafetyScore(Math.round(newScore));

      // Simulate random alerts
      if (Math.random() > 0.95) {
        const alertTypes = [
          { type: 'warning', message: 'You are approaching a restricted zone', severity: 'warning' },
          { type: 'info', message: 'Welcome to a popular tourist spot!', severity: 'info' },
          { type: 'danger', message: 'High crime rate area detected nearby', severity: 'error' }
        ];
        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        setAlerts(prev => [...prev.slice(-4), { ...randomAlert, id: Date.now() }]);
      }
    }, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(locationInterval);
    };
  }, []);

  const handleRegistrationComplete = (profileData) => {
    setUserProfile(profileData);
    setUserRegistered(true);
    localStorage.setItem('touristProfile', JSON.stringify(profileData));
  };

  const handleEmergency = () => {
    setEmergencyDialog(true);
    // In a real app, this would trigger emergency protocols
    setAlerts(prev => [...prev, {
      id: Date.now(),
      type: 'emergency',
      message: 'Emergency alert sent! Help is on the way.',
      severity: 'error'
    }]);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home /> },
    { id: 'profile', label: 'Digital ID', icon: <PersonPin /> },
    { id: 'safety', label: 'Safety Score', icon: <Shield /> },
    { id: 'location', label: 'Location Tracker', icon: <LocationOn /> },
    { id: 'offline', label: 'Offline Guide', icon: <WifiOff /> },
  ];

  if (!userRegistered) {
    return <Registration onComplete={handleRegistrationComplete} />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard userProfile={userProfile} safetyScore={safetyScore} alerts={alerts} location={location} />;
      case 'profile':
        return <DigitalID userProfile={userProfile} />;
      case 'safety':
        return <SafetyScore score={safetyScore} location={location} />;
      case 'location':
        return <LocationTracker location={location} isOnline={isOnline} />;
      case 'offline':
        return <OfflineGuide isOnline={isOnline} />;
      default:
        return <Dashboard userProfile={userProfile} safetyScore={safetyScore} alerts={alerts} location={location} />;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="fixed" sx={{ background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            🛡️ Tourist Safety
          </Typography>

          {!isOnline && (
            <Chip
              icon={<WifiOff />}
              label="Offline Mode"
              color="warning"
              size="small"
              sx={{ mr: 1 }}
            />
          )}

          <Chip
            icon={<Shield />}
            label={`Safety: ${safetyScore}%`}
            color={safetyScore > 80 ? 'success' : safetyScore > 60 ? 'warning' : 'error'}
            size="small"
            sx={{ mr: 2 }}
          />

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

      {/* Side Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, pt: 2 }}>
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Avatar sx={{ width: 60, height: 60, margin: '0 auto', mb: 1, bgcolor: 'primary.main' }}>
              {userProfile?.name?.charAt(0) || 'T'}
            </Avatar>
            <Typography variant="h6">{userProfile?.name || 'Tourist'}</Typography>
            <Typography variant="caption" color="text.secondary">
              Digital ID: {userProfile?.digitalId?.slice(-6) || 'XXXXXX'}
            </Typography>
          </Box>

          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.id} 
                onClick={() => {
                  setCurrentView(item.id);
                  setDrawerOpen(false);
                }}
                selected={currentView === item.id}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, pt: 8, pb: 2, minHeight: '100vh' }}>
        <Container maxWidth="md">
          {/* Alert Banner */}
          {alerts.length > 0 && (
            <Box sx={{ mb: 2 }}>
              {alerts.slice(-1).map((alert) => (
                <Alert 
                  key={alert.id} 
                  severity={alert.severity} 
                  onClose={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                  sx={{ mb: 1 }}
                >
                  {alert.message}
                </Alert>
              ))}
            </Box>
          )}

          {renderCurrentView()}
        </Container>
      </Box>

      {/* Emergency Panic Button */}
      <Fab
        color="error"
        aria-label="emergency"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          width: 70,
          height: 70,
          '&:hover': {
            transform: 'scale(1.1)',
          },
          transition: 'all 0.2s',
        }}
        onClick={handleEmergency}
      >
        <Emergency sx={{ fontSize: 32 }} />
      </Fab>

      {/* Emergency Dialog */}
      <Dialog open={emergencyDialog} onClose={() => setEmergencyDialog(false)}>
        <DialogTitle sx={{ color: 'error.main', fontWeight: 'bold' }}>
          🚨 Emergency Alert Activated
        </DialogTitle>
        <DialogContent>
          <Typography paragraph>
            Your emergency alert has been sent to:
          </Typography>
          <Typography component="div">
            • Nearest Police Station<br />
            • Emergency Contacts<br />
            • Tourism Safety Center<br />
            • Your current location has been shared
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmergencyDialog(false)} variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TouristApp;
