import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Grid,
  Chip,
  Button,
} from '@mui/material';
import { PersonPin, QrCode, Verified, Download } from '@mui/icons-material';

const DigitalID = ({ userProfile }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Digital Tourist ID
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar sx={{ 
                  width: 100, 
                  height: 100, 
                  margin: '0 auto', 
                  mb: 2,
                  fontSize: 40,
                  background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)'
                }}>
                  {userProfile?.name?.charAt(0) || 'T'}
                </Avatar>
                <Chip 
                  icon={<Verified />} 
                  label="Verified" 
                  color="success" 
                  sx={{ mb: 2 }}
                />
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {userProfile?.name || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Digital ID
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {userProfile?.digitalId || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Nationality
                  </Typography>
                  <Typography variant="body1">
                    {userProfile?.nationality || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Visit Purpose
                  </Typography>
                  <Typography variant="body1">
                    {userProfile?.visitPurpose || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Blockchain Hash
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    {userProfile?.blockchainHash || 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, textAlign: 'center' }}>
            <CardContent sx={{ p: 4 }}>
              <QrCode sx={{ fontSize: 120, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                QR Code
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Scan to verify identity and access tourist services
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<Download />}
                fullWidth
                sx={{ mb: 2 }}
              >
                Download QR
              </Button>
              <Typography variant="caption" color="text.secondary">
                Valid until visit ends
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DigitalID;
