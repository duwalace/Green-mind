import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  LinearProgress,
  Card,
  CardContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Timeline as TimelineIcon,
  Edit as EditIcon,
  WaterDrop as WaterIcon,
  Bolt as EnergyIcon,
  WbSunny as ClimateIcon,
  Delete as RecyclingIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const achievements = [
  {
    id: 1,
    title: 'Primeiro Passo',
    description: 'Completou sua primeira lição',
    icon: <TrophyIcon sx={{ color: '#FFD700' }} />,
    date: '2024-01-15'
  },
  {
    id: 2,
    title: 'Mestre da Água',
    description: 'Completou todas as lições sobre água',
    icon: <WaterIcon sx={{ color: '#2196F3' }} />,
    date: '2024-01-20'
  },
  {
    id: 3,
    title: 'Energia Verde',
    description: 'Aprendeu sobre energia renovável',
    icon: <EnergyIcon sx={{ color: '#FFC107' }} />,
    date: '2024-01-25'
  }
];

const trails = [
  {
    id: 1,
    title: 'Água',
    progress: 80,
    icon: <WaterIcon />,
    color: '#2196F3'
  },
  {
    id: 2,
    title: 'Energia',
    progress: 45,
    icon: <EnergyIcon />,
    color: '#FFC107'
  },
  {
    id: 3,
    title: 'Clima',
    progress: 30,
    icon: <ClimateIcon />,
    color: '#4CAF50'
  },
  {
    id: 4,
    title: 'Reciclagem',
    progress: 60,
    icon: <RecyclingIcon />,
    color: '#9C27B0'
  }
];

const Profile = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Coluna da Esquerda - Informações do Perfil */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Avatar
                src={user?.avatar}
                alt={user?.name}
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto 16px',
                  border: '4px solid',
                  borderColor: 'primary.main'
                }}
              />
              <Typography variant="h5" gutterBottom>
                {user?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Nível {user?.level || 1}
              </Typography>
              <Box sx={{ width: '100%', mb: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={70}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'primary.main'
                    }
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                700 XP / 1000 XP
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ mt: 2 }}
              >
                Editar Perfil
              </Button>
            </Paper>

            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Estatísticas
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Pontos Totais"
                    secondary="2,450 XP"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <TimelineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Lições Completadas"
                    secondary="24 lições"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <TrophyIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Conquistas"
                    secondary="8 conquistas"
                  />
                </ListItem>
              </List>
            </Paper>
          </motion.div>
        </Grid>

        {/* Coluna da Direita - Conteúdo Principal */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper sx={{ mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab label="Progresso" />
                <Tab label="Conquistas" />
                <Tab label="Histórico" />
              </Tabs>
            </Paper>

            {tabValue === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Progresso nas Trilhas
                </Typography>
                <Grid container spacing={2}>
                  {trails.map((trail) => (
                    <Grid item xs={12} sm={6} key={trail.id}>
                      <Card>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box
                              sx={{
                                color: trail.color,
                                mr: 1
                              }}
                            >
                              {trail.icon}
                            </Box>
                            <Typography variant="h6">
                              {trail.title}
                            </Typography>
                          </Box>
                          <Box sx={{ width: '100%', mb: 1 }}>
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
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {trail.progress}% completo
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Conquistas
                </Typography>
                <Grid container spacing={2}>
                  {achievements.map((achievement) => (
                    <Grid item xs={12} sm={6} key={achievement.id}>
                      <Card>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            {achievement.icon}
                            <Typography variant="h6" sx={{ ml: 1 }}>
                              {achievement.title}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {achievement.description}
                          </Typography>
                          <Chip
                            label={new Date(achievement.date).toLocaleDateString()}
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {tabValue === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Histórico de Atividades
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Completou a lição 'Conservação de Água'"
                      secondary="Há 2 dias"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <TrophyIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Ganhou a conquista 'Mestre da Água'"
                      secondary="Há 3 dias"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <TimelineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Iniciou a trilha 'Energia Renovável'"
                      secondary="Há 5 dias"
                    />
                  </ListItem>
                </List>
              </Box>
            )}
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 