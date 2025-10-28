import { Card, Typography, Box, Avatar } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface BudgetData {
  currentValue: number;
  previousValue: number;
}

// Utility function to format numbers
const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

export default function BudgetCard() {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/budget")
      .then((res) => res.json())
      .then((data) => {
        console.log("Budget data:", data);
        if ("currentValue" in data && "previousValue" in data) {
          setBudgetData(data);
        } else {
          setError("Invalid budget data format");
        }
      })
      .catch((err) => {
        console.error("Error fetching budget:", err);
        setError("Failed to fetch budget data");
      });
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!budgetData) {
    return <Typography>Loading...</Typography>;
  }

  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const percentChange = calculatePercentageChange(
    budgetData.currentValue,
    budgetData.previousValue
  );
  const isPositive = percentChange >= 0;

  const { currentValue, previousValue } = budgetData;
  const difference = currentValue - previousValue;
  const percentage =
    previousValue !== 0 ? (difference / previousValue) * 100 : 0;

  return (
    <Card sx={{ borderRadius: 6, height: "200px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 0 }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          p={3}
        >
          <Typography
            color="text.secondary"
            gutterBottom
            variant="overline"
            sx={{ mb: 1 }}
          >
            Budget
          </Typography>
          <Typography variant="h4">
            ${formatNumber(currentValue)}
          </Typography>
        </Box>
        <Box p={3}>
          <Avatar
            sx={{
              backgroundColor: "#635bff",
              height: 56,
              width: 56,
            }}
          >
            <AttachMoneyIcon sx={{ color: "#fff" }} />
          </Avatar>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={0.5}
        flexWrap="nowrap"
        px={3}
      >
        {isPositive ? (
          <ArrowUpwardIcon sx={{ color: "green", fontSize: 20 }} />
        ) : (
          <ArrowDownwardIcon sx={{ color: "red", fontSize: 20 }} />
        )}
        <Typography
          sx={{ color: isPositive ? "green" : "red" }}
          variant="body1"
        >
        {Math.abs(percentage).toFixed(1)}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          since last month
        </Typography>
      </Box>
    </Card>
  );
}
