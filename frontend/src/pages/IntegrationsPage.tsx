import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  InputAdornment,
  TextField,
  Divider,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import { Pagination } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";

const integrations = [
  {
    title: "Dropbox",
    description:
      "Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.",
    img: "/logos/logo-dropbox.png",
    updated: "Jun 26, 2025",
    installs: 504,
  },
  {
    title: "Medium Corporation",
    description:
      "Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.",
    img: "/logos/logo-medium.png",
    updated: "Jun 28, 2025",
    installs: 605,
  },
  {
    title: "Slack",
    description:
      "Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.",
    img: "/logos/logo-slack.png",
    updated: "Jun 26, 2025",
    installs: 957,
  },
  {
    title: "Lyft",
    description:
      "Lyft is an on-demand transportation company based in San Francisco, California.",
    img: "public/logos/logo-lyft.png",
    updated: " Jun 25, 2025",
    installs: 406,
  },
  {
    title: "GitHub",
    description:
      "GitHub is a web-based hosting service for version control of code using Git.",
    img: "public/logo-github.png",
    updated: "Jul 01, 2025",
    installs: 835,
  },
  {
    title: "Squarespace",
    description:
      "Squarespace provides software as a service for website building and hosting. Headquartered in NYC.",
    img: "public/logos/logo-squarespace.png",
    updated: "Jul 01, 2025",
    installs: 435,
  },
];

export default function IntegrationsPage() {
  return (
    <Box px={0 } mt={4}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          <Typography variant="h4" fontWeight={400}>
            Integrations
          </Typography>
          <Box mt={1} display="flex" gap={1}>
            <Button
              startIcon={<UploadIcon />}
              variant="text"
              sx={{ color: "text.primary" }}
            >
              Import
            </Button>
            <Button
              startIcon={<DownloadIcon />}
              variant="text"
              sx={{ color: "text.primary" }}
            >
              Export
            </Button>
          </Box>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#7b47ff", color: "#fff" }}
        >
          Add
        </Button>
      </Box>

      {/* Search Bar */}
      <Card sx={{ mb: 3, borderRadius: 6 }}>
        <CardContent>
          <TextField
            placeholder="Search integration"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                height: "60px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Card>

      {/* Integration Cards */}
      <Box display="flex" flexWrap="wrap" gap={3} justifyContent="flex-start">
        {integrations.map((item, index) => (
          <Box
            key={index}
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 24px)",
                md: "calc(33.33% - 24px)",
              },
              minWidth: "250px",
              flexGrow: 1,
            }}
          >
            <Card sx={{ height: "100%", borderRadius: 3 }}>
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  textAlign="center"
                >
                  <Avatar
                    src={item.img}
                    alt={item.title}
                    sx={{ width: 48, height: 48, mb: 2 }}
                    variant="square"
                  />
                  <Typography variant="h6" fontWeight={600}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" mt={1} color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
              <Box
                display="flex"
                justifyContent="space-between"
                px={2}
                py={1.5}
                fontSize={14}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <UpdateIcon fontSize="small" />
                  Updated: {item.updated}
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <CloudDownloadIcon fontSize="small" />
                  {item.installs} installs
                </Box>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
     <Box display="flex" justifyContent="center" mt={3}>
          <Pagination count={3} page={1} color="black" />
        </Box>
    </Box>
  );
}
