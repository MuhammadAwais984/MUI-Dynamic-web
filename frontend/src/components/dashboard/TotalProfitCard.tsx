import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import { useEffect, useState } from "react";

interface ProfitData {
  currentValue: number;
  previousValue: number;
}

const formatNumber = (num: number): string => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
};

export default function ProfitCard() {
  const [profitData, setProfitData] = useState<ProfitData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/profit")
      .then((res) => res.json())
      .then((data) => {
        if ("currentValue" in data && "previousValue" in data) {
          setProfitData(data);
        } else {
          setError("Invalid profit data format");
        }
      })
      .catch(() => setError("Failed to fetch profit data"));
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!profitData) return <Typography>Loading...</Typography>;

  const { currentValue, previousValue } = profitData;
  const percentChange =
    previousValue !== 0 ? ((currentValue - previousValue) / previousValue) * 100 : 0;
  const isPositive = percentChange >= 0;

  return (
    <Card sx={{ borderRadius: 6, height: "200px" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}>
          <Box display="flex" flexDirection="column">
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
              sx={{ mb: 1 }}
            >
              Total Profit
            </Typography>
            <Typography variant="h4">${formatNumber(currentValue)}</Typography>
          </Box>

          <Avatar
            sx={{
              backgroundColor: "#635bff",
              height: 56,
              width: 56,
            }}
          >
            <InsertChartOutlinedIcon sx={{ color: "#fff" }} />
          </Avatar>
        </Box>

        <Box display="flex" alignItems="center" pl={1} pt={1}>
          <Typography
            variant="body1"
            sx={{ color: isPositive ? "green" : "red", display: "flex", alignItems: "center" }}
          >
            {isPositive ? "▲" : "▼"} {Math.abs(percentChange).toFixed(1)}%
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
