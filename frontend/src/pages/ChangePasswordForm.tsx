import { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import axios from "axios";

export default function ChangePasswordForm({ userId }: { userId: number }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/users/${userId}/change-password`,
        { newPassword }
      );
      setMessage("Password updated successfully.");
      setError("");
    } catch (err) {
      setError("Failed to update password.");
      setMessage("");
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" mb={2}>
        Change Password
      </Typography>
      <TextField
        label="New Password"
        type="password"
        fullWidth
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleChangePassword}
      >
        Update Password
      </Button>
      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
}
