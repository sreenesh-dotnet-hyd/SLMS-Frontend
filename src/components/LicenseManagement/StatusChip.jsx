// src/components/StatusChip.jsx
import { Chip } from "@mui/material";
import dayjs from "dayjs";

export function ExpiryStatusChip({ expiry }) {
  if (!expiry) return <Chip label="No expiry" size="small" />;
  const date = dayjs(expiry);
  const days = date.diff(dayjs(), "day");
  let color = "default";
  let label = `Expires ${date.format("YYYY-MM-DD")}`;
  if (days < 0) {
    color = "error";
    label = `Expired ${Math.abs(days)}d ago`;
  } else if (days <= 30) {
    color = "warning";
    label = `Expiring in ${days}d`;
  } else if (days <= 90) {
    color = "info";
  }
  return <Chip label={label} size="small" color={color} />;
}
