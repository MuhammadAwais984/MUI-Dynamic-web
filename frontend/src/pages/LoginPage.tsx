import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await login(email, password); // Get response from API
    localStorage.setItem('token', res.access_token); // ✅ Store token
    localStorage.setItem('user', JSON.stringify(res.user)); // ✅ Store user
    navigate('/dashboard'); // ✅ Navigate to dashboard
  } catch (err) {
    setError(err?.response?.data?.message || 'Invalid credentials');
  }
};

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Don't have an account? <Button onClick={() => navigate('/register')}>Sign Up</Button>
        </Typography>
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Forgot your password? <Button onClick={() => navigate('/forgot-password')}>Reset</Button>
        </Typography>
      </Box>
    </Container>
  );
}
