import {
  Box,
  Typography,
  Card,
  Divider,
  Button,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ArrowForwardIos";

const orders = [
  {
    id: "ORD-007",
    product: "Smart Watch",
    date: "Jun 26, 2025",
    status: "Pending",
  },
  {
    id: "ORD-002",
    product: "Monitor",
    date: "Jun 26, 2025",
    status: "Delivered",
  },
  {
    id: "ORD-005",
    product: "Keyboard",
    date: "Jun 26, 2025",
    status: "Refunded",
  },
  {
    id: "ORD-003",
    product: "Mouse",
    date: "Jun 26, 2025",
    status: "Pending",
  },
  {
    id: "ORD-004",
    product: "Chair",
    date: "Jun 26, 2025",
    status: "Delivered",
  },
];

export default function RecentOrdersCard() {
  return (
    <Card sx={{ borderRadius: 6, minWidth: 200, flexShrink: 0 }} >
      <Typography variant="h6" gutterBottom px={3} py={2}>
        Recent Orders
      </Typography>

      <Box
        sx={{

          overflowX: "auto"
        }}
      >
        {/* Table header row */}
        <Box
          display="flex"
          minWidth={800}
          px={2}
          py={2}
          bgcolor="#f5f5f5"
          color="text.secondary"
          fontFamily={"'Roboto', sans-serif"}
          fontWeight={500}
        >
          <Box flex={1}>Order</Box>
          <Box flex={1}>Customer</Box>
          <Box flex={1}>Date</Box>
          <Box flex={1}>Status</Box>
        </Box>
        <Divider />

        {/* Table body rows */}
        {orders.map((order, index) => (
          <Box
            key={index}
            display="flex"
            minWidth={800}
            px={2}
            py={2}
            fontFamily={"'Roboto', sans-serif"}
            alignItems="center"
            fontSize={14}
            sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
          >
            <Box flex={1}>{order.id}</Box>
            <Box flex={1}>{order.product}</Box>
            <Box flex={1}>{order.date}</Box>
            <Box flex={1}>
              <Box
                px={1.5}
                py={0.5}
                borderRadius={2}
                sx={{
                  display: "inline-block",
                  backgroundColor:
                    order.status === "Delivered"
                      ? "#2ed3b8"
                      : order.status === "Pending"
                      ? "orange"
                      : "red",
                  color:
                    order.status === "Delivered"
                      ? "white"
                      : order.status === "Pending"
                      ? "white"
                      : "white",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                {order.status}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Divider />

      <Box display="flex" justifyContent="flex-end" px={2} py={2}>
        <Button
          sx={{
            color: "black",
            textTransform: "none",
            fontSize: 14,
            borderRadius: 3,
          }}
        >
          View All
          <ChevronRightIcon sx={{ fontSize: 16, ml: 1 }} />
        </Button>
      </Box>
    </Card>
  );
}
