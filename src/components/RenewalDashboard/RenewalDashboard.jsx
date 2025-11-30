// src/pages/dashboard/RenewalDashboard.jsx
import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import dayjs from "dayjs";
import { getLicenses } from "../api_data/licenses";
import { ExpiryStatusChip } from "../LicenseManagement/StatusChip";

export default function RenewalDashboard() {
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    getLicenses().then(setLicenses);
  }, []);

  const grouped = useMemo(() => {
    const now = dayjs();
    const soon = [];
    const later = [];
    const expired = [];

    licenses.forEach(l => {
      if (!l.expiryDate) return;
      const d = dayjs(l.expiryDate);
      const diff = d.diff(now, "day");
      if (diff < 0) expired.push(l);
      else if (diff <= 30) soon.push(l);
      else later.push(l);
    });
    return { soon, later, expired };
  }, [licenses]);

  const renderTable = (rows, title) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Expiry</TableCell>
              <TableCell>Seats</TableCell>
              <TableCell>Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(l => (
              <TableRow key={l.id}>
                <TableCell>{l.productName}</TableCell>
                <TableCell>{l.vendor}</TableCell>
                <TableCell>
                  <ExpiryStatusChip expiry={l.expiryDate} />
                </TableCell>
                <TableCell>{l.totalEntitlements}</TableCell>
                <TableCell>
                  {l.cost} {l.currency}
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  None.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Renewal & Expiry Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {renderTable(grouped.soon, "Expiring ≤ 30 days")}
          {renderTable(grouped.later, "Expiring later")}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderTable(grouped.expired, "Expired")}
        </Grid>
      </Grid>
    </Box>
  );
}
