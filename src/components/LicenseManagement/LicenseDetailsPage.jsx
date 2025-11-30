// // src/pages/licenses/LicenseDetailsPage.jsx
// import { useEffect, useState, useMemo } from "react";
// import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Chip,
//   Stack
// } from "@mui/material";
// import dayjs from "dayjs";
// import {
//   getLicenseById,
//   getLicenseEntitlements,
//   getLicenseInstallations
// } from "../api_data/licenses";
// import SeatUsageBar from "./SeatUsageBar";
// import { ExpiryStatusChip } from "./StatusChip";

// export default function LicenseDetailsPage({ role }) {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [license, setLicense] = useState(null);
//   const [entitlements, setEntitlements] = useState([]);
//   const [installations, setInstallations] = useState([]);

//   useEffect(() => {
//     getLicenseById(id).then(setLicense);
//     getLicenseEntitlements(id).then(setEntitlements);
//     getLicenseInstallations(id).then(setInstallations);
//   }, [id]);

//   const usage = useMemo(() => {
//     const used = entitlements.length;
//     const total = license?.totalEntitlements ?? 0;
//     return { used, total, available: total - used };
//   }, [license, entitlements]);

//   if (!license) return null;

//   const lowCapacityAlert =
//     usage.total > 0 && usage.available <= Math.max(1, Math.floor(usage.total * 0.1)); // <= 10%

//   const expiry = license.expiryDate ? dayjs(license.expiryDate) : null;
//   const expiryDays = expiry ? expiry.diff(dayjs(), "day") : null;
//   const expiryAlert = expiryDays !== null && expiryDays <= 30;

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
//         <Typography variant="h5">
//           {license.productName} – {license.vendor}
//         </Typography>
//         <Stack direction="row" spacing={1}>
//           {role === "ITAdmin" && (
//             <Button
//               variant="outlined"
//               onClick={() => navigate(`/licenses/${id}/edit`)}
//             >
//               Edit
//             </Button>
//           )}
//           <Button variant="text" onClick={() => navigate(-1)}>
//             Back
//           </Button>
//         </Stack>
//       </Box>

//       <Grid container spacing={2}>
//         {/* License Info + Contract */}
//         <Grid item xs={12} md={8}>
//           <Card sx={{ mb: 2 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 License Info
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <Typography variant="body2">Product</Typography>
//                   <Typography variant="subtitle1">
//                     {license.productName}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body2">Vendor</Typography>
//                   <Typography variant="subtitle1">{license.vendor}</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body2">License Type</Typography>
//                   <Chip label={license.licenseType} size="small" />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body2">SKU</Typography>
//                   <Typography>{license.sku || "-"}</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body2">Purchase Date</Typography>
//                   <Typography>
//                     {license.purchaseDate
//                       ? dayjs(license.purchaseDate).format("YYYY-MM-DD")
//                       : "-"}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body2">Expiry</Typography>
//                   <ExpiryStatusChip expiry={license.expiryDate} />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body2">Cost</Typography>
//                   <Typography>
//                     {license.cost} {license.currency}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="body2">Notes</Typography>
//                   <Typography>{license.notes || "-"}</Typography>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Contract Details
//               </Typography>
//               {license.vendorContract ? (
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <Typography variant="body2">Vendor Name</Typography>
//                     <Typography>{license.vendorContract.vendorName}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2">Contract Number</Typography>
//                     <Typography>{license.vendorContract.contractNumber}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2">Contract Purchase Date</Typography>
//                     <Typography>
//                       {dayjs(license.vendorContract.purchaseDate).format(
//                         "YYYY-MM-DD"
//                       )}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2">Contract Expiry</Typography>
//                     <ExpiryStatusChip
//                       expiry={license.vendorContract.expiryDate}
//                     />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2">Price</Typography>
//                     <Typography>{license.vendorContract.price}</Typography>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Typography variant="body2">Terms</Typography>
//                     <Typography>
//                       {license.vendorContract.terms || "-"}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               ) : (
//                 <Typography variant="body2">
//                   No vendor contract linked.
//                 </Typography>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Usage & Alerts */}
//         <Grid item xs={12} md={4}>
//           <Card sx={{ mb: 2 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 License Usage
//               </Typography>
//               <SeatUsageBar total={usage.total} used={usage.used} />
//               <Typography variant="body2" sx={{ mt: 1 }}>
//                 Available seats: {usage.available}
//               </Typography>

//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="body2" sx={{ mb: 1 }}>
//                   Quick actions
//                 </Typography>
//                 <Stack direction="row" spacing={1} flexWrap="wrap">
//                   <Button
//                     size="small"
//                     component={RouterLink}
//                     to="/assign"
//                     state={{ licenseId: license.id }}
//                   >
//                     Assign Seat
//                   </Button>
//                   <Button
//                     size="small"
//                     component={RouterLink}
//                     to="/entitlements"
//                     state={{ licenseId: license.id }}
//                   >
//                     View Entitlements
//                   </Button>
//                   <Button
//                     size="small"
//                     component={RouterLink}
//                     to="/installed"
//                     state={{ licenseId: license.id }}
//                   >
//                     View Installations
//                   </Button>
//                 </Stack>
//               </Box>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Alerts
//               </Typography>
//               {!(expiryAlert || lowCapacityAlert) && (
//                 <Typography variant="body2">No active alerts.</Typography>
//               )}
//               <Stack spacing={1}>
//                 {expiryAlert && (
//                   <Chip
//                     color="warning"
//                     label="License nearing expiry (≤ 30 days)"
//                     size="small"
//                   />
//                 )}
//                 {lowCapacityAlert && (
//                   <Chip
//                     color="error"
//                     label="Low license capacity (≤ 10% seats left)"
//                     size="small"
//                   />
//                 )}
//               </Stack>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Entitlements & Installations lists */}
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Assigned Seats (Entitlements)
//               </Typography>
//               <Table size="small">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>User</TableCell>
//                     <TableCell>Device</TableCell>
//                     <TableCell>Assigned At</TableCell>
//                     <TableCell>Expires At</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {entitlements.map(e => (
//                     <TableRow key={e.id}>
//                       <TableCell>{e.user?.displayName ?? "-"}</TableCell>
//                       <TableCell>{e.device?.hostname ?? "-"}</TableCell>
//                       <TableCell>
//                         {dayjs(e.assignedAt).format("YYYY-MM-DD")}
//                       </TableCell>
//                       <TableCell>
//                         {e.expiresAt
//                           ? dayjs(e.expiresAt).format("YYYY-MM-DD")
//                           : "-"}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                   {entitlements.length === 0 && (
//                     <TableRow>
//                       <TableCell colSpan={4} align="center">
//                         No entitlements for this license.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Installations (Devices)
//               </Typography>
//               <Table size="small">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Device</TableCell>
//                     <TableCell>Product</TableCell>
//                     <TableCell>Version</TableCell>
//                     <TableCell>Installed On</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {installations.map(i => (
//                     <TableRow key={i.id}>
//                       <TableCell>{i.device?.hostname ?? "-"}</TableCell>
//                       <TableCell>{i.productName}</TableCell>
//                       <TableCell>{i.version}</TableCell>
//                       <TableCell>
//                         {dayjs(i.installDate).format("YYYY-MM-DD")}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                   {installations.length === 0 && (
//                     <TableRow>
//                       <TableCell colSpan={4} align="center">
//                         No installations linked.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }



import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  getLicenseById,
  getLicenseEntitlements,
  getLicenseInstallations
} from "../api_data/licenses";

import "./LicenseDetailsPage.css";

export default function LicenseDetailsPage({ role }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [license, setLicense] = useState(null);
  const [entitlements, setEntitlements] = useState([]);
  const [installations, setInstallations] = useState([]);

  useEffect(() => {
    getLicenseById(id).then(setLicense);
    getLicenseEntitlements(id).then(setEntitlements);
    getLicenseInstallations(id).then(setInstallations);
  }, [id]);

  const usage = useMemo(() => {
    const used = entitlements.length;
    const total = license?.totalEntitlements ?? 0;
    return { used, total, available: total - used };
  }, [license, entitlements]);

  if (!license) return null;

  const expiry = license.expiryDate ? dayjs(license.expiryDate) : null;
  const expiryDays = expiry ? expiry.diff(dayjs(), "day") : null;
  const expiryAlert = expiryDays !== null && expiryDays <= 30;

  const lowCapacityAlert =
    usage.total > 0 && usage.available <= Math.max(1, Math.floor(usage.total * 0.1));

  return (
    <div className="license-page">

      {/* Header */}
      <div className="header-row">
        <h2>{license.productName} – {license.vendor}</h2>

        <div className="header-actions">
          {role === "ITAdmin" && (
            <button
              className="btn-outline"
              onClick={() => navigate(`/licenses/${id}/edit`)}
            >
              Edit
            </button>
          )}

          <button className="btn-text" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>

      <div className="grid-2">
        {/* Left Side */}
        <div>
          {/* License Info */}
          <div className="card">
            <h3 className="section-title">License Info</h3>

            <div className="grid-2">
              <div>
                <p className="label">Product</p>
                <p className="value">{license.productName}</p>
              </div>

              <div>
                <p className="label">Vendor</p>
                <p className="value">{license.vendor}</p>
              </div>

              <div>
                <p className="label">License Type</p>
                <span className="chip">{license.licenseType}</span>
              </div>

              <div>
                <p className="label">SKU</p>
                <p className="value">{license.sku || "-"}</p>
              </div>

              <div>
                <p className="label">Purchase Date</p>
                <p className="value">
                  {license.purchaseDate
                    ? dayjs(license.purchaseDate).format("YYYY-MM-DD")
                    : "-"}
                </p>
              </div>

              <div>
                <p className="label">Expiry</p>
                <span className="chip">
                  {license.expiryDate
                    ? dayjs(license.expiryDate).format("YYYY-MM-DD")
                    : "-"}
                </span>
              </div>

              <div>
                <p className="label">Cost</p>
                <p className="value">{license.cost} {license.currency}</p>
              </div>

              <div className="full">
                <p className="label">Notes</p>
                <p className="value">{license.notes || "-"}</p>
              </div>
            </div>
          </div>

          {/* Contract */}
          <div className="card">
            <h3 className="section-title">Alerts</h3>

            {!(expiryAlert || lowCapacityAlert) && (
              <p>No active alerts.</p>
            )}

            <div className="alerts">
              {expiryAlert && (
                <span className="chip warning">
                  License expiring (≤ 30 days)
                </span>
              )}

              {lowCapacityAlert && (
                <span className="chip error">
                  Low license capacity (≤ 10% left)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div>
          {/* Usage */}
          <div className="card">
            <h3 className="section-title">License Usage</h3>

            <div className="usage-bar">
              <div
                className="usage-bar-fill"
                style={{ width: `${(usage.used / usage.total) * 100}%` }}
              ></div>
            </div>

            <p className="value small">Available seats: {usage.available}</p>

            <div className="quick-actions">
              <p className="label">Quick Actions</p>

              <div className="action-buttons">
                <Link className="btn-small" to="/assign" state={{ licenseId: license.id }}>
                  Assign Seat
                </Link>

                <Link className="btn-small" to="/entitlements" state={{ licenseId: license.id }}>
                  View Entitlements
                </Link>

                <Link className="btn-small" to="/installed" state={{ licenseId: license.id }}>
                  View Installations
                </Link>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="card">
            <h3 className="section-title">Contract Details</h3>

            {license.vendorContract ? (
              <div className="grid-2">
                <div>
                  <p className="label">Vendor Name</p>
                  <p className="value">{license.vendorContract.vendorName}</p>
                </div>

                <div>
                  <p className="label">Contract Number</p>
                  <p className="value">{license.vendorContract.contractNumber}</p>
                </div>

                <div>
                  <p className="label">Contract Purchase Date</p>
                  <p className="value">
                    {dayjs(license.vendorContract.purchaseDate).format("YYYY-MM-DD")}
                  </p>
                </div>

                <div>
                  <p className="label">Contract Expiry</p>
                  <span className="chip">
                    {dayjs(license.vendorContract.expiryDate).format("YYYY-MM-DD")}
                  </span>
                </div>

                <div>
                  <p className="label">Price</p>
                  <p className="value">{license.vendorContract.price}</p>
                </div>

                <div className="full">
                  <p className="label">Terms</p>
                  <p className="value">{license.vendorContract.terms || "-"}</p>
                </div>
              </div>
            ) : (
              <p>No vendor contract linked.</p>
            )}
          </div>

        </div>
      </div>

      {/* Entitlements */}
      <div className="card mt">
        <h3 className="section-title">Assigned Seats (Entitlements)</h3>
        <div className="device-table-wrapper">
          <table className="simple-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Device</th>
                <th>Assigned At</th>
                <th>Expires At</th>
              </tr>
            </thead>

            <tbody>
              {entitlements.length === 0 && (
                <tr><td colSpan={4} className="no-data">No entitlements.</td></tr>
              )}

              {entitlements.map(e => (
                <tr key={e.id}>
                  <td>{e.user?.displayName ?? "-"}</td>
                  <td>{e.device?.hostname ?? "-"}</td>
                  <td>{dayjs(e.assignedAt).format("YYYY-MM-DD")}</td>
                  <td>{e.expiresAt ? dayjs(e.expiresAt).format("YYYY-MM-DD") : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Installations */}
      <div className="card mt">
        <h3 className="section-title">Installations</h3>

        <table className="simple-table">
          <thead>
            <tr>
              <th>Device</th>
              <th>Product</th>
              <th>Version</th>
              <th>Installed On</th>
            </tr>
          </thead>

          <tbody>
            {installations.length === 0 && (
              <tr><td colSpan={4} className="no-data">No installations.</td></tr>
            )}

            {installations.map(i => (
              <tr key={i.id}>
                <td>{i.device?.hostname ?? "-"}</td>
                <td>{i.productName}</td>
                <td>{i.version}</td>
                <td>{dayjs(i.installDate).format("YYYY-MM-DD")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

