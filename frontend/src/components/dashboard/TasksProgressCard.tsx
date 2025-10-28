import { Card, CardContent, Typography, Box, Avatar, LinearProgress } from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function BudgetCard() {
  return (
    <Card sx={{ borderRadius: 6, height: "200px" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 1,
          }}
        >
          <Box display="flex" flexDirection="column">
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
              sx={{ mb: 1 }}
            >
              Task Progress
            </Typography>
            <Typography variant="h4">75.5</Typography>
          </Box>
          <Avatar
            sx={{
              backgroundColor: "warning.main", // orange color from MUI theme
              height: 56,
              width: 56,
            }}
          >
            <FormatListBulletedIcon sx={{ color: "#fff" }} />
          </Avatar>
        </Box>
        <Box sx={{ mt: 0 }}>
                    <LinearProgress variant="determinate" value={75.5} />
                  </Box>
      </CardContent>
    </Card>
  );
}
