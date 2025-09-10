import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  LinearProgress,
  Alert,
  Grid,
  Divider,
} from '@mui/material';
import {
  PersonAdd,
  CameraAlt,
  Fingerprint,
  CheckCircle,
  PersonPin,
  Security,
  LocationOn,
  Phone,
} from '@mui/icons-material';

const Registration = ({ onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    aadhaarNumber: '',
    passportNumber: '',
    nationality: 'Indian',
    emergencyContact: '',
    emergencyPhone: '',
    visitPurpose: '',
    duration: '',
    accommodation: '',
    itinerary: '',
  });
  const [digitalIdGenerating, setDigitalIdGenerating] = useState(false);

  const steps = ['Personal Info', 'KYC Verification', 'Emergency Contacts', 'Travel Details', 'Digital ID Generation'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      generateDigitalId();
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const generateDigitalId = () => {
    setDigitalIdGenerating(true);
    
    // Simulate blockchain-based digital ID generation
    setTimeout(() => {
      const digitalId = `TSID-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      const blockchainHash = `0x${Math.random().toString(16).substr(2, 40)}`;
      
      const profileData = {
        ...formData,
        digitalId,
        blockchainHash,
        registrationDate: new Date().toISOString(),
        safetyScore: 85,
        verificationStatus: 'verified',
        qrCode: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="white"/><text x="50" y="50" text-anchor="middle" fill="black">${digitalId}</text></svg>`)}`
      };
      
      setDigitalIdGenerating(false);
      onComplete(profileData);
    }, 3000);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="primary.main">
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Nationality</InputLabel>
                  <Select
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                  >
                    <MenuItem value="Indian">Indian</MenuItem>
                    <MenuItem value="Foreign">Foreign National</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="primary.main">
              KYC Verification
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              Please provide valid government identification for verification
            </Alert>
            <Grid container spacing={2}>
              {formData.nationality === 'Indian' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Aadhaar Number"
                    value={formData.aadhaarNumber}
                    onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                    placeholder="XXXX XXXX XXXX"
                    required
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Passport Number"
                  value={formData.passportNumber}
                  onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                  required={formData.nationality === 'Foreign'}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ 
                  border: '2px dashed #ccc', 
                  borderRadius: 2, 
                  p: 3, 
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main' }
                }}>
                  <CameraAlt sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
                  <Typography variant="body2" color="grey.600">
                    Click to upload ID document photo
                  </Typography>
                  <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                    Upload Document
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="primary.main">
              Emergency Contacts
            </Typography>
            <Alert severity="warning" sx={{ mb: 2 }}>
              Emergency contacts will be notified in case of safety alerts
            </Alert>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Emergency Contact Name"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Emergency Contact Phone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        );
      
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="primary.main">
              Travel Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Purpose of Visit</InputLabel>
                  <Select
                    value={formData.visitPurpose}
                    onChange={(e) => handleInputChange('visitPurpose', e.target.value)}
                  >
                    <MenuItem value="Tourism">Tourism</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Medical">Medical</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duration of Stay (days)"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Accommodation Address"
                  multiline
                  rows={2}
                  value={formData.accommodation}
                  onChange={(e) => handleInputChange('accommodation', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Travel Itinerary"
                  multiline
                  rows={3}
                  value={formData.itinerary}
                  onChange={(e) => handleInputChange('itinerary', e.target.value)}
                  placeholder="Briefly describe your planned activities and places to visit"
                />
              </Grid>
            </Grid>
          </Box>
        );
      
      case 4:
        return (
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom color="primary.main">
              Digital ID Generation
            </Typography>
            {digitalIdGenerating ? (
              <Box>
                <Fingerprint sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Generating Blockchain-based Digital ID...
                </Typography>
                <LinearProgress sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  Creating secure digital identity with encrypted blockchain hash
                </Typography>
              </Box>
            ) : (
              <Box>
                <PersonPin sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Ready to Generate Digital ID
                </Typography>
                <Typography variant="body1" paragraph>
                  Your information has been verified. Click below to generate your secure digital tourist ID.
                </Typography>
                <Alert severity="success" sx={{ mb: 2, textAlign: 'left' }}>
                  <Typography variant="subtitle2">Features included:</Typography>
                  • Blockchain-secured identity<br />
                  • QR code for verification<br />
                  • Emergency contact integration<br />
                  • Real-time safety monitoring<br />
                  • Geo-fence alerts
                </Alert>
              </Box>
            )}
          </Box>
        );
      
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return formData.name && formData.email && formData.phone && formData.nationality;
      case 1:
        return formData.nationality === 'Indian' 
          ? formData.aadhaarNumber && formData.passportNumber
          : formData.passportNumber;
      case 2:
        return formData.emergencyContact && formData.emergencyPhone;
      case 3:
        return formData.visitPurpose && formData.duration;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)',
      py: 4 
    }}>
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <CardContent sx={{ p: 4 }}>
            <Box textAlign="center" mb={4}>
              <Avatar sx={{ 
                width: 80, 
                height: 80, 
                margin: '0 auto', 
                mb: 2, 
                background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)' 
              }}>
                <PersonAdd sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h4" gutterBottom color="primary.main" fontWeight="bold">
                Tourist Registration
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Create your secure digital tourist ID for Northeast India
              </Typography>
            </Box>

            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Card variant="outlined" sx={{ mb: 4, borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                {renderStepContent()}
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                size="large"
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isStepValid() || digitalIdGenerating}
                size="large"
                sx={{ 
                  background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
                  px: 4 
                }}
              >
                {activeStep === steps.length - 1 
                  ? digitalIdGenerating 
                    ? 'Generating...' 
                    : 'Generate Digital ID'
                  : 'Next'
                }
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Registration;
