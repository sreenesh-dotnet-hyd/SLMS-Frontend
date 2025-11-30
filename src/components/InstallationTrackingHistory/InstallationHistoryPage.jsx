// src/pages/installed/InstallationHistoryPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip
} from "@mui/material";
import dayjs from "dayjs";
import { getInstallationHistory } from "../api_data/installed";

export default function InstallationHistoryPage() {
  const { id } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getInstallationHistory(id)
      .then(setEvents)
      .catch(console.error);
  }, [id]);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Installation History (ID: {id})
      </Typography>

      <Card>
        <CardContent>
          {events.length === 0 ? (
            <Typography variant="body2">
              No history events for this installation.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {events
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.timestamp) - new Date(a.timestamp)
                )
                .map(ev => (
                  <Grid item xs={12} key={ev.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1
                          }}
                        >
                          <Chip
                            label={ev.action}
                            size="small"
                            sx={{ textTransform: "uppercase" }}
                          />
                          <Typography variant="body2">
                            {dayjs(ev.timestamp).format(
                              "YYYY-MM-DD HH:mm"
                            )}
                          </Typography>
                        </Box>
                        <Typography variant="body2">
                          Performed by: {ev.performedBy}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ mt: 1 }}
                        >
                          {ev.notes || "-"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
