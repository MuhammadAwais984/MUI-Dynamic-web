import axios from 'axios';

export const login = async (email: string, password: string) => {
  const res = await axios.post(
    'http://localhost:3000/auth/login',
    { email, password },
    { withCredentials: true } // ✅ Send/receive cookies
  );
  return res.data;
};

export const logout = async () => {
  await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
};
