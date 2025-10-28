import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { useEffect, useState } from "react";

export default function BudgetCard() {
  const [totalCustomers, setTotalCustomers] = useState(0);

useEffect(() => {
  fetch("http://localhost:3000/users/total")
    .then((res) => res.json())
    .then((data) => setTotalCustomers(data.total));
}, []);
  return (
    <Card sx={{ borderRadius: 6, height: "200px" }}>
      <CardContent>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}
        >
          <Box display="flex" flexDirection="column">
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
              sx={{ mb: 0 }}
            >
              Total
            </Typography>
            <Typography color="text.secondary" gutterBottom variant="overline">
              Customers
            </Typography>
            <Typography variant="h4"> {totalCustomers.toLocaleString()}</Typography>
          </Box>
          <Avatar
            sx={{
              backgroundColor: "#2ed3b8", // green background
              height: 56,
              width: 56,
            }}
          >
            <PeopleIcon sx={{ color: "rgba(0, 0, 0, 0.08" }} />
          </Avatar>
        </Box>
      </CardContent>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={1.5}
        flexWrap="nowrap"
        px={3}
      >
        <Typography sx={{ color: "red" }}>↓ 16%</Typography>
        <Typography variant="body2" color="text.secondary">
          since last month
        </Typography>
      </Box>
    </Card>
  );
}
