import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Card,
  CardContent,
  CardActions,
  Avatar
} from '@mui/material';
import {
  WaterDrop as WaterIcon,
  Bolt as EnergyIcon,
  WbSunny as ClimateIcon,
  Delete as RecyclingIcon
} from '@mui/icons-material';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

const trails = [
  {
    id: 1,
    title: 'Água',
    icon: <WaterIcon sx={{ fontSize: 40 }} />,
    color: '#2196F3',
    progress: 60
  },
  {
    id: 2,
    title: 'Energia',
    icon: <EnergyIcon sx={{ fontSize: 40 }} />,
    color: '#FFC107',
    progress: 30
  },
  {
    id: 3,
    title: 'Clima',
    icon: <ClimateIcon sx={{ fontSize: 40 }} />,
    color: '#4CAF50',
    progress: 45
  },
  {
    id: 4,
    title: 'Reciclagem',
    icon: <RecyclingIcon sx={{ fontSize: 40 }} />,
    color: '#9C27B0',
    progress: 75
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        {/* Seção de Boas-vindas */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{ width: 64, height: 64, mr: 2 }}
              alt={user?.name}
              src="/static/images/avatar/2.jpg"
            />
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Olá, {user?.name}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Continue sua jornada de aprendizado ambiental
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Seção de Trilhas */}
        <Typography variant="h5" component="h2" gutterBottom>
          Suas Trilhas
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {trails.map((trail) => (
            <Grid item xs={12} sm={6} md={3} key={trail.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    cursor: 'pointer'
                  }
                }}
                onClick={() => navigate(`/trail/${trail.id}`)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                      color: trail.color
                    }}
                  >
                    {trail.icon}
                    <Typography variant="h6" component="h3" sx={{ ml: 1 }}>
                      {trail.title}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Progresso
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={trail.progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: trail.color
                        }
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, textAlign: 'right' }}
                    >
                      {trail.progress}%
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/trail/${trail.id}`);
                    }}
                  >
                    Continuar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Seção de Conquistas */}
        <Typography variant="h5" component="h2" gutterBottom>
          Conquistas Recentes
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                🏆 Primeiro Passo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completou sua primeira lição sobre água
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                🌱 Iniciante Verde
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aprendeu sobre reciclagem básica
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Dashboard; 