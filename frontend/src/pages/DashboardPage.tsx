import { Box, Container } from "@mui/material";
import BudgetCard from "../components/dashboard/BudgetCard";
import TotalUsersCard from "../components/dashboard/TotalUsersCard";
import SalesChartCard from "../components/dashboard/SalesChartCard";
import TrafficByDeviceCard from "../components/dashboard/TrafficByDeviceCard";
import TasksProgressCard from "../components/dashboard/TasksProgressCard";
import TotalProfitCard from "../components/dashboard/TotalProfitCard";
import LatestUsersList from "../components/dashboard/LatestUsersList";
import RecentOrdersTable from "../components/dashboard/RecentOrdersTable";

export default function DashboardPage() {

  return (
    <Box sx={{  minHeight: "100vh"}}>
    
      <Box display="flex" gap={3} mb={4} flexWrap="wrap" alignItems="flex-start" >
        <Box width={240} >
          <BudgetCard />
        </Box>
        <Box width={240}>
          <TotalUsersCard />
        </Box>
        <Box width={240}>
          <TasksProgressCard />
        </Box>
        <Box width={240}>
          <TotalProfitCard />
        </Box>
      </Box>

      {/* Row 2 */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Box flex={2} minWidth={300}>
          <SalesChartCard />
        </Box>
        <Box flex={1} minWidth={300}>
          <TrafficByDeviceCard />
        </Box>
      </Box>

      {/* Row 3 */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Box flex={1} minWidth={300}>
          <LatestUsersList />
        </Box>
        <Box flex={2} minWidth={600}>
          <RecentOrdersTable />
        </Box>
      </Box>
    </Box>
  );
}
