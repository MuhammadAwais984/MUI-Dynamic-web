import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  TextField,
  Divider,
  MenuItem,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AccountPage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // empty for security
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const options = [
    { label: "Los Angeles", value: "los angeles" },
    { label: "USA", value: "usa" },
    { label: "New York", value: "new york" },
    { label: "Chicago", value: "chicago" },
    { label: "Houston", value: "houston" },
    { label: "San Francisco", value: "san francisco" },
  ];

  // 🔄 Load data from localStorage on mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setName(userData.first_name || "");
      setLastName(userData.last_name || "");
      setEmail(userData.email || "");
      setUsername(userData.username || "");
      setPhone(userData.phone || "");
      setCity(userData.city || "");
    }
  }, []);

  const handleSave = async () => {
    if (!name || !lastName || !email || !username || !phone || !city) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Optional: include password only if not empty
      const payload = {
        first_name: name,
        last_name: lastName,
        email,
        username,
        phone,
        city,
      };

      if (password) {
        payload["password"] = password;
      }

      // Temporary: use /auth/register (for future: replace with /users/update)
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        payload
      );

      alert("User saved successfully!");
      console.log(response.data);

      // Update localStorage if needed
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Clear password input
      setPassword("");
    } catch (error) {
      alert("Save failed. Check console for details.");
      console.error(error);
    }
  };

  return (
    <Box sx={{ mt: 4, p: 0 }}>
      <Typography variant="h4" fontWeight={400} mb={3}>
        Account
      </Typography>
      <Box display="flex" alignItems="flex-start" gap={3} mb={3}>
        {/* Left Side - Avatar Card */}
        <Card sx={{ borderRadius: 6, mb: 3, p: 0, width: "30%" }}>
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <Avatar
                src="https://i.pravatar.cc/300"
                sx={{ width: 120, height: 120 }}
              />
              <Box
                display="flex"
                flexDirection="column"
                gap={0}
                alignItems="center"
                mb={3}
              >
                <Typography variant="h6" fontWeight={600}>
                  {name} {lastName}
                </Typography>
                <Typography color="text.secondary">{city}</Typography>
                <Typography color="text.secondary">GMT+5</Typography>
              </Box>
            </Box>
          </CardContent>
          <Divider />
          <CardContent>
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              sx={{
                textTransform: "none",
                width: "100%",
                color: "#635bff",
                borderRadius: 4,
              }}
            >
              Upload Photo
            </Button>
          </CardContent>
        </Card>

        {/* Right Side - Profile Form */}
        <Card sx={{ borderRadius: 6, mb: 3, p: 0, width: "70%" }}>
          <CardContent>
            <Typography variant="h6" fontWeight={400} pl={1} pt={1}>
              Profile
            </Typography>
            <Typography color="text.secondary" mb={2} pl={1}>
              The information can be edited
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ display: "flex", gap: 2, p: 2 }}>
            <Box display="flex" flexDirection="column" gap={2} width={"50%"}>
              <TextField
                label="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
            </Box>
            <Box display="flex" flexDirection="column" gap={2} width={"50%"}>
              <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
              />
              <TextField
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                placeholder="Leave blank to keep unchanged"
              />
            </Box>
          </CardContent>
          <Divider />
          <CardContent sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "#635bff", borderRadius: 4 }}
              onClick={handleSave}
            >
              Save Details
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
