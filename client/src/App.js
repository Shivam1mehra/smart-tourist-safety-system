import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppSelector from './components/AppSelector';
import TouristApp from './components/TouristApp/TouristApp';
import PoliceApp from './components/PoliceApp/PoliceApp';
import AdminApp from './components/AdminApp/AdminApp';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Green for safety
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#FF5722', // Orange for alerts
      light: '#FF8A65',
      dark: '#D84315',
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#F57C00',
    },
    info: {
      main: '#1976D2',
    },
    success: {
      main: '#388E3C',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  const [selectedApp, setSelectedApp] = useState(localStorage.getItem('selectedApp') || null);

  useEffect(() => {
    if (selectedApp) {
      localStorage.setItem('selectedApp', selectedApp);
    }
  }, [selectedApp]);

  const handleAppSelect = (appType) => {
    setSelectedApp(appType);
  };

  const handleLogout = () => {
    setSelectedApp(null);
    localStorage.removeItem('selectedApp');
    localStorage.removeItem('userSession');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/" 
              element={
                !selectedApp ? (
                  <AppSelector onAppSelect={handleAppSelect} />
                ) : (
                  <Navigate to={`/${selectedApp}`} replace />
                )
              } 
            />
            <Route 
              path="/tourist" 
              element={
                selectedApp === 'tourist' ? (
                  <TouristApp onLogout={handleLogout} />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/police" 
              element={
                selectedApp === 'police' ? (
                  <PoliceApp onLogout={handleLogout} />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/admin" 
              element={
                selectedApp === 'admin' ? (
                  <AdminApp onLogout={handleLogout} />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
