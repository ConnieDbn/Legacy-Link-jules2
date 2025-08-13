import api from './api';

// Login user
const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// Register user
const register = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

// Get current user
const getCurrentUser = async () => {
  const response = await api.get('/auth/user');
  return response.data;
};

const authService = {
  login,
  register,
  getCurrentUser,
};

export default authService;
