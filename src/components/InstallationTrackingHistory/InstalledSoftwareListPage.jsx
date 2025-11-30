// // src/pages/installed/InstalledSoftwareListPage.jsx
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   TextField,
//   InputAdornment,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton
// } from "@mui/material";
// import { Search, History, Devices } from "@mui/icons-material";
// import dayjs from "dayjs";
// import { getInstalled } from "../api_data/installed";
// import { Link, useLocation } from "react-router-dom";

// export default function InstalledSoftwareListPage() {
//   const [data, setData] = useState([]);
//   const [q, setQ] = useState("");
//   const location = useLocation();
//   const licenseFilterFromNav = location.state?.licenseId ?? null;

//   useEffect(() => {
//     getInstalled().then(setData);
//   }, []);

//   const filtered = data.filter(i => {
//     if (licenseFilterFromNav && i.licenseId !== licenseFilterFromNav)
//       return false;
//     return `${i.productName} ${i.device?.hostname ?? ""}`
//       .toLowerCase()
//       .includes(q.toLowerCase());
//   });

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
//         <Typography variant="h5">Installed Software Inventory</Typography>
//         <TextField
//           size="small"
//           placeholder="Search product or device..."
//           value={q}
//           onChange={e => setQ(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Search />
//               </InputAdornment>
//             )
//           }}
//         />
//       </Box>

//       <Card>
//         <CardContent>
//           <Table size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Device</TableCell>
//                 <TableCell>Product</TableCell>
//                 <TableCell>Version</TableCell>
//                 <TableCell>License</TableCell>
//                 <TableCell>Installed</TableCell>
//                 <TableCell />
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filtered.map(i => (
//                 <TableRow key={i.id}>
//                   <TableCell>{i.device?.hostname ?? "-"}</TableCell>
//                   <TableCell>{i.productName}</TableCell>
//                   <TableCell>{i.version}</TableCell>
//                   <TableCell>
//                     {i.license ? `${i.license.productName}` : "-"}
//                   </TableCell>
//                   <TableCell>
//                     {dayjs(i.installDate).format("YYYY-MM-DD")}
//                   </TableCell>
//                   <TableCell align="right">
//                     <IconButton
//                       size="small"
//                       component={Link}
//                       to={`/devices/${i.deviceId}/installations`}
//                     >
//                       <Devices fontSize="small" />
//                     </IconButton>
//                     <IconButton
//                       size="small"
//                       component={Link}
//                       to={`/installed/${i.id}/history`}
//                     >
//                       <History fontSize="small" />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {filtered.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     No installations.
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
import { getInstalled } from "../api_data/installed";
import "./InstalledSoftwareListPage.css";

export default function InstalledSoftwareListPage() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

  const location = useLocation();
  const licenseFilterFromNav = location.state?.licenseId ?? null;

  useEffect(() => {
    getInstalled().then(setData);
  }, []);

  const filtered = data.filter(i => {
    if (licenseFilterFromNav && i.licenseId !== licenseFilterFromNav)
      return false;

    return `${i.productName} ${i.device?.hostname ?? ""}`
      .toLowerCase()
      .includes(q.toLowerCase());
  });

  return (
    <div className="page-container">
      {/* Header Row */}
      <div className="header-row">
        <h2 className="title">Installed Software Inventory</h2>

        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="Search product or device..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>
      </div>

      {/* Card */}
      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Device</th>
                <th>Product</th>
                <th>Version</th>
                <th>License</th>
                <th>Installed</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(i => (
                <tr key={i.id}>
                  <td>{i.device?.hostname ?? "-"}</td>
                  <td>{i.productName}</td>
                  <td>{i.version}</td>
                  <td>{i.license ? i.license.productName : "-"}</td>
                  <td>{dayjs(i.installDate).format("YYYY-MM-DD")}</td>

                  <td className="action-buttons text-right">
                    <Link
                      to={`devices/${i.deviceId}/installed`}
                      className="icon-btn"
                      title="View Device Installations"
                    >
                      Installations
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/installed/${i.id}/history`}
                      className="icon-btn"
                      title="View Install History"
                    >
                      History
                    </Link>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="no-data">
                    No installations.
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
