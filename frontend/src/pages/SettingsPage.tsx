import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  city: string;
}

export default function SettingsPage() {
  const [userData, setUserData] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    city: "",
    currentPassword: "",
    newPassword: "",
  });

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login again.");
        return;
      }

      const res = await axios.get("http://localhost:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(res.data);
      setFormData((prev) => ({
        ...prev,
        firstName: res.data.firstName || "",
        lastName: res.data.lastName || "",
        username: res.data.username || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        city: res.data.city || "",
      }));
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Failed to fetch user data. Please try logging in again.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      if (!userData?.id) {
        alert("User ID is missing.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token missing. Please log in again.");
        return;
      }

      // Update user fields
      await axios.put(
        `http://localhost:3000/users/${userData.id}`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update password if provided
      if (formData.currentPassword && formData.newPassword) {
        await axios.put(
          `http://localhost:3000/users/${userData.id}/change-password`,
          {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      alert("Changes saved successfully.");
      fetchUser(); // Refresh data
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Error saving changes.");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Change Password
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="password"
            label="Current Password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="password"
            label="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
