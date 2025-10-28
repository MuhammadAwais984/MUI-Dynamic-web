import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useEffect, useState } from "react";

interface SalesChartData {
  name: string;         // month name
  current: number;      // current month value
  previous: number;     // previous month value
}

export default function SalesChartCard() {
const [data, setData] = useState<SalesChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/sales-chart")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sales data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Card sx={{ height: "100%", width: "100%" ,borderRadius: 6}}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight={600}>
            Sales
          </Typography>
          <Button startIcon={<RefreshIcon />} size="small">
            Sync
          </Button>
        </Box>

        {/* FIX: Full width and height */}
        <Box sx={{ height: 300, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4}>
              <XAxis dataKey="name" stroke="#9e9e9e" fontSize={12} />
              <YAxis
                stroke="#9e9e9e"
                fontSize={12}
                tickFormatter={(v) => `${v / 1000}K`}
              />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Bar
                dataKey="previous"
                fill="#c5cae9"
                barSize={40}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="current"
                fill='#635bff'
                barSize={40}

                radius={[0, 0, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
