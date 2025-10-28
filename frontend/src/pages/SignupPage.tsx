import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    city: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const values = Object.values(form);
    const hasEmptyField = values.some((val) => val.trim() === "");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (hasEmptyField) {
      alert("Please fill out all fields.");
      return;
    }

    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await axios.post("http://localhost:3000/auth/register", form);
      navigate("/login"); // Redirect after success
      alert("Registration successful! Please log in.");
    } catch (err) {
      alert(err.response.data.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Create Account
        </Typography>
        {Object.keys(form).map((key) => (
          <TextField
            key={key}
            label={key.replace("_", " ")}
            name={key}
            type={key === "password" ? "password" : "text"}
            fullWidth
            margin="normal"
            value={form[key]}
            onChange={handleChange}
          />
        ))}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
}
