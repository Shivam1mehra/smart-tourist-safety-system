import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Chip, Alert } from '@mui/material';
import { LocationOn, MyLocation, Share, WifiOff } from '@mui/icons-material';

const LocationTracker = ({ location, isOnline }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Location Tracker
      </Typography>
      
      {!isOnline && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          You're offline. Last known location is being displayed.
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, height: 400 }}>
            <CardContent sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <LocationOn sx={{ fontSize: 120, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>Interactive Map</Typography>
                <Typography variant="body2" color="text.secondary">
                  Map view would be displayed here using Leaflet/Google Maps
                </Typography>
                <Chip label="Live Tracking" color="success" sx={{ mt: 2 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Current Location</Typography>
              <Typography variant="body1">Patna, Bihar</Typography>
              <Typography variant="body2" color="text.secondary">
                Lat: {location.lat.toFixed(6)}<br />
                Lng: {location.lng.toFixed(6)}
              </Typography>
              <Button startIcon={<Share />} fullWidth sx={{ mt: 2 }}>
                Share Location
              </Button>
            </CardContent>
          </Card>
          
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Button startIcon={<MyLocation />} fullWidth sx={{ mb: 1 }}>
                Update Location
              </Button>
              <Button variant="outlined" fullWidth>
                View Route History
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LocationTracker;
