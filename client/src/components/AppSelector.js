import React from 'react';
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
  Avatar,
  Chip,
} from '@mui/material';
import {
  PersonPin,
  Security,
  AdminPanelSettings,
  LocationOn,
  Shield,
  Dashboard,
} from '@mui/icons-material';

const AppSelector = ({ onAppSelect }) => {
  const apps = [
    {
      id: 'tourist',
      title: 'Tourist Safety App',
      description: 'Digital ID, Safety Score, Geo-fencing alerts, and Emergency features for tourists',
      icon: <PersonPin sx={{ fontSize: 40 }} />,
      color: '#2E7D32',
      features: ['Digital ID Generation', 'Safety Score Monitoring', 'Panic Button', 'Real-time Tracking', 'Offline Support'],
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
    },
    {
      id: 'police',
      title: 'Police Dashboard',
      description: 'Real-time tourist monitoring, incident management, and emergency response system',
      icon: <Security sx={{ fontSize: 40 }} />,
      color: '#1976D2',
      features: ['Tourist Monitoring', 'Heat Maps', 'Alert Management', 'Digital ID Verification', 'Incident Response'],
      gradient: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
    },
    {
      id: 'admin',
      title: 'Admin Control Panel',
      description: 'System configuration, user management, AI monitoring, and analytics dashboard',
      icon: <AdminPanelSettings sx={{ fontSize: 40 }} />,
      color: '#F57C00',
      features: ['System Configuration', 'User Management', 'Geo-fence Setup', 'AI Monitoring', 'Analytics'],
      gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
            🛡️ Smart Tourist Safety System
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
            AI-Powered Safety Monitoring with Blockchain Digital ID & Geo-Fencing
          </Typography>
          <Chip 
            label="MVP Demo Version" 
            color="secondary" 
            sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}
          />
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {apps.map((app) => (
            <Grid item xs={12} sm={6} lg={4} key={app.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                  },
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
                onClick={() => onAppSelect(app.id)}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: app.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px auto',
                      color: 'white',
                    }}
                  >
                    {app.icon}
                  </Box>
                  
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: app.color }}>
                    {app.title}
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {app.description}
                  </Typography>

                  <Box sx={{ mt: 2, textAlign: 'left' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: app.color }}>
                      Key Features:
                    </Typography>
                    {app.features.map((feature, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}>
                        • {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background: app.gradient,
                      color: 'white',
                      fontWeight: 'bold',
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      textTransform: 'none',
                      '&:hover': {
                        background: app.gradient,
                        opacity: 0.9,
                      },
                    }}
                    onClick={() => onAppSelect(app.id)}
                  >
                    Launch {app.title.split(' ')[0]} App
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={4}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Developed for Ministry of Development of North Eastern Region
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Problem Statement ID: 25002 - Smart Tourist Safety MVP Demo
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AppSelector;
