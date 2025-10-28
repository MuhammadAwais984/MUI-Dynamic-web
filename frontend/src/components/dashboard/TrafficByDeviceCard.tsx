import {
  Card, CardContent, Typography, Box, Avatar, Grid
} from '@mui/material';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

const COLORS = ['#635bff', '#00bfa5', '#fb8c00'];

const data = [
  { name: 'Desktop', value: 63 },
  { name: 'Tablet', value: 15 },
  { name: 'Phone', value: 22 },
];

const icons = [
  { icon: LaptopMacIcon, label: 'Desktop', color: '#635bff' },
  { icon: TabletMacIcon, label: 'Tablet', color: '#00bfa5' },
  { icon: PhoneIphoneIcon, label: 'Phone', color: '#fb8c00' },
];

export default function TrafficByDeviceCard() {
  return (
    <Card sx={{ height: '100%', width: '100%', borderRadius: 6 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Traffic source
        </Typography>
      <Box height={240} width="100%">
  <ResponsiveContainer>
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={3}
      >
        {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
</Box>

        <Grid container justifyContent="space-around" mt={2}>
          {icons.map((item, idx) => (
            <Box key={idx} textAlign="center">
              <Avatar sx={{ bgcolor: item.color, width: 32, height: 32, mx: 'auto' }}>
                <item.icon fontSize="small" />
              </Avatar>
              <Typography variant="body2">{item.label}</Typography>
              <Typography variant="subtitle1">{data[idx].value}%</Typography>
            </Box>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
