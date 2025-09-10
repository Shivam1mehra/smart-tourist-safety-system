import React from 'react';
import { Box, Card, CardContent, Typography, Grid, List, ListItem, ListItemIcon, ListItemText, Chip, Button } from '@mui/material';
import { WifiOff, Phone, LocationOn, Info, Emergency, Map } from '@mui/icons-material';

const OfflineGuide = ({ isOnline }) => {
  const emergencyContacts = [
    { name: 'Police Emergency', number: '100', type: 'police' },
    { name: 'Medical Emergency', number: '108', type: 'medical' },
    { name: 'Fire Emergency', number: '101', type: 'fire' },
    { name: 'Tourist Helpline', number: '1363', type: 'tourist' }
  ];

  const offlineTips = [
    'Your location is cached and will sync when back online',
    'Emergency contacts are stored locally',
    'Offline maps are available for major tourist areas',
    'Safety alerts will be queued until connection restored'
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Offline Guide
      </Typography>
      
      {!isOnline && (
        <Card sx={{ borderRadius: 3, bgcolor: 'warning.light', color: 'warning.contrastText', mb: 3 }}>
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            <WifiOff sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h6" gutterBottom>You are currently offline</Typography>
            <Typography variant="body2">
              Don't worry! Essential features are still available
            </Typography>
          </CardContent>
        </Card>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom color="error.main">
                Emergency Contacts
              </Typography>
              <List>
                {emergencyContacts.map((contact, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Phone color="error" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={contact.name}
                      secondary={contact.number}
                    />
                    <Button href={`tel:${contact.number}`} size="small" color="error">
                      Call
                    </Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Offline Features Available
              </Typography>
              <List>
                {offlineTips.map((tip, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Info color="info" />
                    </ListItemIcon>
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Map sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Offline Map</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Basic map with key landmarks and emergency locations
              </Typography>
              <Chip label="Works without internet" color="success" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OfflineGuide;
