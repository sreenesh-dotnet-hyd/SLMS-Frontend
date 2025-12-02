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
  const [entitlements, setEntitlements] = useState([]);
  const [devices, setDevices] = useState([]);
  const location = useLocation();
  const licenseFilterFromNav = location.state?.licenseId ?? null;
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadDevices();
  }, [])

  useEffect(() => {
    loadEntitlementsData();
  }, [devices])


  async function loadDevices() {
    try {


      const res = await fetch("https://localhost:7153/inventory/devices", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`  // <-- JWT goes here
        }
      });
      const data = await res.json();
      setDevices(data);
      console.log("devices data:", data);
    } catch (err) {
      console.error("Failed to fetch devices", err);
    }

  }


  const loadEntitlementsData = async () => {

    try {
      const res = await fetch("https://localhost:7153/inventory/entitlements/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`  // <-- JWT goes here
        }
      })


      var data = await res.json();


      console.log(devices);
      const updatedEntitlements = data.map(ent => {
        const device = devices.find(d => Number(d.id) === Number(ent.deviceId));

        if (device) {
          return {
            ...ent,
            deviceId: device.deviceId,
            userId: device.ownerUserId
            // replace numeric key with readable ID
          };
        }

        return ent; // if device not found, keep original
      });

      console.log("Updated entitlements:", updatedEntitlements);

      setEntitlements(updatedEntitlements);
      setData(updatedEntitlements);


      // setEntitlements(data);

    }
    catch (error) {
      console.log(error);
    }
  }
 

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

          
        </div>
      </div>

      {/* Card */}
      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>License Id</th>
                <th>User Owner Id</th>
                <th>Device Id</th>
                <th>Assigned At</th>
                <th>Expires</th>
        
              </tr>
            </thead>

            <tbody>
              {filtered.map(e => (
                <tr key={e.id}>
                  <td>{e.licenseId ?? "-"}</td>
                  <td>{e.userId ?? "-"}</td>
                  <td>{e.deviceId ?? "-"}</td>
                  <td>{dayjs(e.assignedAt).format("YYYY-MM-DD")}</td>
                  <td>
                    <ExpiryStatusChip expiry={e.expiresAt} />
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

