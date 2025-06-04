import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Paper
} from '@mui/material';
import {
  WaterDrop as WaterIcon,
  Bolt as EnergyIcon,
  WbSunny as ClimateIcon,
  Delete as RecyclingIcon
} from '@mui/icons-material';
import Layout from '../components/Layout';

const trails = [
  {
    id: 1,
    title: 'Água',
    description: 'Aprenda sobre conservação de água, ciclo hidrológico e práticas sustentáveis.',
    icon: <WaterIcon sx={{ fontSize: 60 }} />,
    color: '#2196F3',
    image: '/images/water.jpg',
    levels: 5
  },
  {
    id: 2,
    title: 'Energia',
    description: 'Descubra sobre fontes de energia renovável, eficiência energética e consumo consciente.',
    icon: <EnergyIcon sx={{ fontSize: 60 }} />,
    color: '#FFC107',
    image: '/images/energy.jpg',
    levels: 5
  },
  {
    id: 3,
    title: 'Clima',
    description: 'Entenda sobre mudanças climáticas, efeito estufa e ações para mitigação.',
    icon: <ClimateIcon sx={{ fontSize: 60 }} />,
    color: '#4CAF50',
    image: '/images/climate.jpg',
    levels: 5
  },
  {
    id: 4,
    title: 'Reciclagem',
    description: 'Aprenda sobre separação de resíduos, compostagem e redução de lixo.',
    icon: <RecyclingIcon sx={{ fontSize: 60 }} />,
    color: '#9C27B0',
    image: '/images/recycling.jpg',
    levels: 5
  }
];

const TrailSelection = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Container maxWidth="lg">
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Escolha sua Trilha
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Selecione uma trilha para começar sua jornada de aprendizado ambiental.
            Cada trilha contém 5 níveis de conhecimento.
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          {trails.map((trail) => (
            <Grid item xs={12} md={6} key={trail.id}>
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
                onClick={() => navigate(`/trail/${trail.id}/level/1`)}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 140,
                    backgroundColor: trail.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  {trail.icon}
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {trail.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {trail.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {trail.levels} níveis de aprendizado
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/trail/${trail.id}/level/1`);
                    }}
                  >
                    Começar Trilha
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default TrailSelection; 