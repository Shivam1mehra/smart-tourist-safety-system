import React from 'react';
import { Box, Card, CardContent, Typography, LinearProgress, Grid, Chip } from '@mui/material';
import { Shield, LocationOn, TrendingUp } from '@mui/icons-material';

const SafetyScore = ({ score, location }) => {
  const factors = [
    { name: 'Area Safety Rating', value: 88, color: 'success' },
    { name: 'Time of Day', value: 75, color: 'warning' },
    { name: 'Weather Conditions', value: 92, color: 'success' },
    { name: 'Crowd Density', value: 70, color: 'warning' },
    { name: 'Police Presence', value: 85, color: 'success' }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        AI Safety Analysis
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, textAlign: 'center', p: 3 }}>
            <Shield sx={{ fontSize: 80, color: score > 80 ? 'success.main' : 'warning.main', mb: 2 }} />
            <Typography variant="h2" fontWeight="bold" color={score > 80 ? 'success.main' : 'warning.main'}>
              {score}%
            </Typography>
            <Typography variant="h6" gutterBottom>Overall Safety Score</Typography>
            <LinearProgress variant="determinate" value={score} sx={{ height: 10, borderRadius: 5 }} />
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant="h6" gutterBottom>Safety Factors</Typography>
            {factors.map((factor, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{factor.name}</Typography>
                  <Chip label={`${factor.value}%`} color={factor.color} size="small" />
                </Box>
                <LinearProgress variant="determinate" value={factor.value} color={factor.color} />
              </Box>
            ))}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SafetyScore;
