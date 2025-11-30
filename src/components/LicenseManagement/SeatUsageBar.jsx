// src/components/SeatUsageBar.jsx
import { Box, LinearProgress, Typography } from "@mui/material";

export default function SeatUsageBar({ total, used }) {
  const value = total > 0 ? Math.round((used / total) * 100) : 0;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography variant="body2">
          Seats: {used}/{total}
        </Typography>
        <Typography variant="body2">{value}%</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{ borderRadius: 2, height: 8 }}
      />
    </Box>
  );
}
