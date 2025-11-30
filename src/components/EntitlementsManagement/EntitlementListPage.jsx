// // src/pages/entitlements/EntitlementListPage.jsx
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   TextField,
//   MenuItem,
//   Stack,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton,
//   Button
// } from "@mui/material";
// import { Delete } from "@mui/icons-material";
// import dayjs from "dayjs";
// import { getEntitlements, deleteEntitlement } from "../api_data/entitlements";
// import { ExpiryStatusChip } from "../LicenseManagement/StatusChip";
// import { Link, useLocation } from "react-router-dom";

// export default function EntitlementListPage() {
//   const [data, setData] = useState([]);
//   const [status, setStatus] = useState("all");
//   const location = useLocation();
//   const licenseFilterFromNav = location.state?.licenseId ?? null;

//   const load = () => {
//     getEntitlements().then(setData);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const filtered = data.filter(e => {
//     if (licenseFilterFromNav && e.licenseId !== licenseFilterFromNav)
//       return false;
//     if (status === "all") return true;
//     const expired = e.expiresAt && dayjs(e.expiresAt).isBefore(dayjs(), "day");
//     if (status === "expired") return expired;
//     if (status === "active") return !expired;
//     return true;
//   });

//   const handleDelete = async id => {
//     if (!window.confirm("Revoke this entitlement?")) return;
//     await deleteEntitlement(id);
//     load();
//   };

//   return (
//     <Box>
//       <Box
//         sx={{
//           display: "flex",
//           mb: 2,
//           alignItems: "center",
//           justifyContent: "space-between"
//         }}
//       >
//         <Typography variant="h5">Entitlements</Typography>
//         <Stack direction="row" spacing={2}>
//           <TextField
//             select
//             size="small"
//             label="Status"
//             value={status}
//             onChange={e => setStatus(e.target.value)}
//             sx={{ minWidth: 150 }}
//           >
//             <MenuItem value="all">All</MenuItem>
//             <MenuItem value="active">Active</MenuItem>
//             <MenuItem value="expired">Expired</MenuItem>
//           </TextField>
//           <Button component={Link} to="/assign" variant="contained">
//             Assign License
//           </Button>
//         </Stack>
//       </Box>

//       <Card>
//         <CardContent>
//           <Table size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell>License</TableCell>
//                 <TableCell>User</TableCell>
//                 <TableCell>Device</TableCell>
//                 <TableCell>Assigned At</TableCell>
//                 <TableCell>Expires</TableCell>
//                 <TableCell />
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filtered.map(e => (
//                 <TableRow key={e.id}>
//                   <TableCell>{e.license?.productName}</TableCell>
//                   <TableCell>{e.user?.displayName ?? "-"}</TableCell>
//                   <TableCell>{e.device?.hostname ?? "-"}</TableCell>
//                   <TableCell>
//                     {dayjs(e.assignedAt).format("YYYY-MM-DD")}
//                   </TableCell>
//                   <TableCell>
//                     <ExpiryStatusChip expiry={e.expiresAt} />
//                   </TableCell>
//                   <TableCell align="right">
//                     <IconButton
//                       size="small"
//                       onClick={() => handleDelete(e.id)}
//                     >
//                       <Delete fontSize="small" />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {filtered.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     No entitlements.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }



import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { getEntitlements, deleteEntitlement } from "../api_data/entitlements";
import { ExpiryStatusChip } from "../LicenseManagement/StatusChip";
import "./EntitlementListPage.css";

export default function EntitlementListPage() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("all");

  const location = useLocation();
  const licenseFilterFromNav = location.state?.licenseId ?? null;

  const load = () => {
    getEntitlements().then(setData);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = data.filter(e => {
    if (licenseFilterFromNav && e.licenseId !== licenseFilterFromNav)
      return false;

    if (status === "all") return true;

    const expired =
      e.expiresAt && dayjs(e.expiresAt).isBefore(dayjs(), "day");

    if (status === "expired") return expired;
    if (status === "active") return !expired;

    return true;
  });

  const handleDelete = async id => {
    if (!window.confirm("Revoke this entitlement?")) return;
    await deleteEntitlement(id);
    load();
  };

  return (
    <div className="page-container">

      {/* Header */}
      <div className="header-row">
        <h2 className="title">Entitlements</h2>

        <div className="header-actions">
          <select
            className="select-input"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>

          <Link to="/entitlements/assign" className="btn primary-btn">
            Assign License
          </Link>
        </div>
      </div>

      {/* Card */}
      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>License</th>
                <th>User</th>
                <th>Device</th>
                <th>Assigned At</th>
                <th>Expires</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(e => (
                <tr key={e.id}>
                  <td>{e.license?.productName ?? "-"}</td>
                  <td>{e.user?.displayName ?? "-"}</td>
                  <td>{e.device?.hostname ?? "-"}</td>
                  <td>{dayjs(e.assignedAt).format("YYYY-MM-DD")}</td>
                  <td>
                    <ExpiryStatusChip expiry={e.expiresAt} />
                  </td>
                  <td className="text-right">
                    <button
                      className="icon-btn delete-btn"
                      onClick={() => handleDelete(e.id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="no-data">
                    No entitlements.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

