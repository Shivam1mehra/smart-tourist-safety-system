const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ["https://your-frontend-app.onrender.com", "https://smart-tourist-safety.onrender.com"]
      : ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ["https://your-frontend-app.onrender.com", "https://smart-tourist-safety.onrender.com"]
    : ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true
}));
app.use(express.json());

// In-memory data store (for demo purposes)
let tourists = [];
let policeUnits = [];
let alerts = [];
let geofences = [
  { id: 1, name: 'Gandhi Maidan Safe Zone', coordinates: [[25.6093, 85.1376], [25.6100, 85.1380]], type: 'safe' },
  { id: 2, name: 'Railway Station - Medium Risk', coordinates: [[25.6026, 85.1373], [25.6030, 85.1380]], type: 'medium' },
  { id: 3, name: 'Industrial Area - High Risk', coordinates: [[25.5950, 85.1300], [25.5970, 85.1350]], type: 'restricted' }
];

// AI Safety Analysis Simulation
const analyzeLocationSafety = (lat, lng, timeOfDay = new Date().getHours()) => {
  // Simulate AI-powered safety analysis
  const baseScore = Math.random() * 30 + 70; // Base score between 70-100
  
  // Time-based adjustments
  let timeMultiplier = 1.0;
  if (timeOfDay >= 22 || timeOfDay <= 5) timeMultiplier = 0.8; // Night time is riskier
  else if (timeOfDay >= 6 && timeOfDay <= 18) timeMultiplier = 1.1; // Day time is safer
  
  // Location-based adjustments (simplified)
  let locationMultiplier = 1.0;
  if (lat > 25.610) locationMultiplier = 0.9; // Further from city center
  if (lng < 85.135) locationMultiplier = 0.85; // Industrial areas
  
  const finalScore = Math.min(95, Math.max(60, baseScore * timeMultiplier * locationMultiplier));
  
  return {
    score: Math.round(finalScore),
    factors: {
      areaRating: Math.round(baseScore * locationMultiplier),
      timeOfDay: Math.round(baseScore * timeMultiplier),
      weatherCondition: 92,
      crowdDensity: Math.round(Math.random() * 40 + 60),
      policePresence: Math.round(Math.random() * 30 + 70)
    },
    recommendations: finalScore < 75 ? ['Avoid isolated areas', 'Stay in well-lit places', 'Consider traveling in groups'] : []
  };
};

// Blockchain Digital ID Simulation
const generateDigitalId = (touristData) => {
  const timestamp = Date.now();
  const hash = crypto.createHash('sha256')
    .update(JSON.stringify({ ...touristData, timestamp }))
    .digest('hex');
  
  return {
    digitalId: `TSID-${timestamp}-${hash.substr(0, 8).toUpperCase()}`,
    blockchainHash: `0x${hash}`,
    timestamp: new Date(timestamp).toISOString(),
    verified: true
  };
};

// API Routes

// Tourist registration
app.post('/api/tourists/register', (req, res) => {
  try {
    const touristData = req.body;
    const digitalIdData = generateDigitalId(touristData);
    
    const tourist = {
      id: uuidv4(),
      ...touristData,
      ...digitalIdData,
      registrationDate: new Date().toISOString(),
      lastLocation: { lat: 25.6093, lng: 85.1376 },
      safetyScore: 85,
      status: 'active'
    };
    
    tourists.push(tourist);
    
    res.status(201).json({
      success: true,
      message: 'Tourist registered successfully',
      data: tourist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// Get tourist profile
app.get('/api/tourists/:id', (req, res) => {
  const tourist = tourists.find(t => t.id === req.params.id || t.digitalId === req.params.id);
  
  if (!tourist) {
    return res.status(404).json({
      success: false,
      message: 'Tourist not found'
    });
  }
  
  res.json({
    success: true,
    data: tourist
  });
});

// Update tourist location
app.post('/api/tourists/:id/location', (req, res) => {
  const { lat, lng } = req.body;
  const tourist = tourists.find(t => t.id === req.params.id || t.digitalId === req.params.id);
  
  if (!tourist) {
    return res.status(404).json({
      success: false,
      message: 'Tourist not found'
    });
  }
  
  // Update location
  tourist.lastLocation = { lat, lng };
  tourist.lastSeen = new Date().toISOString();
  
  // Analyze safety
  const safetyAnalysis = analyzeLocationSafety(lat, lng);
  tourist.safetyScore = safetyAnalysis.score;
  
  // Check geo-fences
  const alertsGenerated = [];
  geofences.forEach(fence => {
    // Simplified geo-fence check (in real app, use proper geo calculations)
    if (Math.abs(lat - fence.coordinates[0][0]) < 0.002 && 
        Math.abs(lng - fence.coordinates[0][1]) < 0.002) {
      if (fence.type === 'restricted') {
        const alert = {
          id: uuidv4(),
          touristId: tourist.id,
          touristName: tourist.name,
          message: `Tourist entered restricted zone: ${fence.name}`,
          severity: 'error',
          location: { lat, lng },
          timestamp: new Date().toISOString(),
          status: 'active'
        };
        alerts.push(alert);
        alertsGenerated.push(alert);
      }
    }
  });
  
  // Emit real-time updates
  io.emit('locationUpdate', {
    touristId: tourist.id,
    location: { lat, lng },
    safetyScore: safetyAnalysis.score
  });
  
  if (alertsGenerated.length > 0) {
    io.emit('newAlert', alertsGenerated);
  }
  
  res.json({
    success: true,
    data: {
      location: tourist.lastLocation,
      safetyAnalysis,
      alerts: alertsGenerated
    }
  });
});

// Emergency panic button
app.post('/api/emergency/:touristId', (req, res) => {
  const tourist = tourists.find(t => t.id === req.params.touristId || t.digitalId === req.params.touristId);
  
  if (!tourist) {
    return res.status(404).json({
      success: false,
      message: 'Tourist not found'
    });
  }
  
  const emergencyAlert = {
    id: uuidv4(),
    type: 'emergency',
    touristId: tourist.id,
    touristName: tourist.name,
    message: 'Emergency SOS activated',
    severity: 'critical',
    location: tourist.lastLocation,
    timestamp: new Date().toISOString(),
    status: 'active'
  };
  
  alerts.push(emergencyAlert);
  
  // Emit emergency alert to all connected clients
  io.emit('emergencyAlert', emergencyAlert);
  
  res.json({
    success: true,
    message: 'Emergency alert sent successfully',
    data: emergencyAlert
  });
});

// Get all active tourists (for police dashboard)
app.get('/api/police/tourists', (req, res) => {
  const activeTourists = tourists.filter(t => t.status === 'active').map(tourist => ({
    id: tourist.id,
    digitalId: tourist.digitalId,
    name: tourist.name,
    location: tourist.lastLocation,
    safetyScore: tourist.safetyScore,
    lastSeen: tourist.lastSeen || tourist.registrationDate,
    status: tourist.status
  }));
  
  res.json({
    success: true,
    data: activeTourists
  });
});

// Get all alerts (for police dashboard)
app.get('/api/police/alerts', (req, res) => {
  const activeAlerts = alerts.filter(a => a.status === 'active').sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );
  
  res.json({
    success: true,
    data: activeAlerts
  });
});

// Get system statistics (for admin dashboard)
app.get('/api/admin/stats', (req, res) => {
  const stats = {
    totalTourists: tourists.length,
    activeTourists: tourists.filter(t => t.status === 'active').length,
    totalAlerts: alerts.length,
    activeAlerts: alerts.filter(a => a.status === 'active').length,
    avgSafetyScore: Math.round(tourists.reduce((sum, t) => sum + (t.safetyScore || 0), 0) / tourists.length) || 0,
    geofences: geofences.length
  };
  
  res.json({
    success: true,
    data: stats
  });
});

// Get geo-fences
app.get('/api/geofences', (req, res) => {
  res.json({
    success: true,
    data: geofences
  });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`Client ${socket.id} joined room: ${room}`);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Smart Tourist Safety System API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Default route
app.get('/', (req, res) => {
  res.json({
    message: 'Smart Tourist Safety System API',
    version: '1.0.0',
    endpoints: {
      'POST /api/tourists/register': 'Register new tourist',
      'GET /api/tourists/:id': 'Get tourist profile',
      'POST /api/tourists/:id/location': 'Update tourist location',
      'POST /api/emergency/:touristId': 'Emergency panic button',
      'GET /api/police/tourists': 'Get all active tourists',
      'GET /api/police/alerts': 'Get all alerts',
      'GET /api/admin/stats': 'Get system statistics',
      'GET /api/geofences': 'Get geo-fences',
      'GET /api/health': 'Health check'
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Smart Tourist Safety System Server running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}`);
  console.log(`📊 WebSocket server ready for real-time updates`);
});
