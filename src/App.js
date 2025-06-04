import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import { Box } from '@mui/material';

// Páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TrailSelection from './pages/TrailSelection';
import TrailLevel from './pages/TrailLevel';
import Profile from './pages/Profile';
import Achievements from './pages/Achievements';

// Componentes
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Box sx={{ pt: 8 }}> {/* Espaço para o header fixo */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/trails"
            element={
              <PrivateRoute>
                <TrailSelection />
              </PrivateRoute>
            }
          />
          <Route
            path="/trail/:trailId/level/:levelId"
            element={
              <PrivateRoute>
                <TrailLevel />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/achievements"
            element={
              <PrivateRoute>
                <Achievements />
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
