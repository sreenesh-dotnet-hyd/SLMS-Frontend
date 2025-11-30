// src/pages/installed/DeviceInstallationsPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import dayjs from "dayjs";
import { getInstalled } from "../api_data/installed";

export default function DeviceInstallationsPage() {
  const { deviceId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    getInstalled({ deviceId }).then(setData);
  }, [deviceId]);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Installations for Device #{deviceId}
      </Typography>
      <Card>
        <CardContent>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>License</TableCell>
                <TableCell>Installed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(i => (
                <TableRow key={i.id}>
                  <TableCell>{i.productName}</TableCell>
                  <TableCell>{i.version}</TableCell>
                  <TableCell>
                    {i.license ? i.license.productName : "-"}
                  </TableCell>
                  <TableCell>
                    {dayjs(i.installDate).format("YYYY-MM-DD")}
                  </TableCell>
                </TableRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No installations for this device.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
