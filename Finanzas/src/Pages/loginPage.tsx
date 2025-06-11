import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  Divider
} from '@mui/material';
import {
  EmailOutlined,
  LockOutlined,
  LoginOutlined,
  PersonOutline
} from '@mui/icons-material';
import { AuthService } from '../Services/AuthService';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/', { email, password });
      
      const token = res.data.accessToken;

      if (token) {
        AuthService.login(token);
        navigate('/inicio');
      } else {
        setError('Token no recibido del servidor.');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      
      if (err.response?.status === 401) {
        setError('Credenciales incorrectas. Verifica tu email y contraseña.');
      } else if (err.response?.status >= 500) {
        setError('Error del servidor. Intenta nuevamente más tarde.');
      } else {
        setError('Error en el login. Verifica tu conexión a internet.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4
        }}
      >
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 3,
            backgroundColor: 'background.paper'
          }}
        >
          {/* Logo/Icono */}
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
            }}
          >
            <PersonOutline sx={{ fontSize: 32, color: 'white' }} />
          </Box>

          {/* Título */}
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              mb: 1, 
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            Iniciar Sesión
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 3, textAlign: 'center' }}
          >
            Ingresa tus credenciales para acceder al sistema
          </Typography>

          <Divider sx={{ width: '100%', mb: 3 }} />

          {/* Formulario */}
          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
            {error && (
              <Alert 
                severity="error" 
                sx={{ mb: 2 }}
                onClose={() => setError('')}
              >
                {error}
              </Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <LoginOutlined />}
              sx={{
                mt: 2,
                mb: 2,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </Box>

          {/* Footer */}
          <Typography 
            variant="caption" 
            color="text.secondary" 
            align="center"
            sx={{ mt: 2 }}
          >
            Sistema de Gestión de Usuarios v1.0
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}