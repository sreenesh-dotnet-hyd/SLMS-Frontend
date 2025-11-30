// // src/pages/licenses/LicensesListPage.jsx
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   TextField,
//   InputAdornment,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody
// } from "@mui/material";
// import { Add, Search, OpenInNew } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import { getLicenses } from "./Licenses";
// import SeatUsageBar from "./SeatUsageBar";
// import { ExpiryStatusChip } from "./StatusChip";

// export default function LicensesListPage({ role }) {
//   const [licenses, setLicenses] = useState([]);
//   const [q, setQ] = useState("");

//   useEffect(() => {
//     getLicenses().then(setLicenses).catch(console.error);
//   }, []);

//   const filtered = licenses.filter(l =>
//     `${l.productName} ${l.vendor} ${l.sku}`
//       .toLowerCase()
//       .includes(q.toLowerCase())
//   );

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
//         <Typography variant="h5">Licenses</Typography>
//         <Box sx={{ display: "flex", gap: 2 }}>
//           <TextField
//             size="small"
//             placeholder="Search product, vendor, SKU..."
//             value={q}
//             onChange={e => setQ(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Search />
//                 </InputAdornment>
//               )
//             }}
//           />
//           {role === "ITAdmin" && (
//             <Button
//               component={Link}
//               to="/licenses/new"
//               variant="contained"
//               startIcon={<Add />}
//             >
//               Add License
//             </Button>
//           )}
//         </Box>
//       </Box>

//       <Card>
//         <CardContent>
//           <Table size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Product</TableCell>
//                 <TableCell>Vendor</TableCell>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Seats</TableCell>
//                 <TableCell>Expiry</TableCell>
//                 <TableCell>Cost</TableCell>
//                 <TableCell />
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filtered.map(lic => (
//                 <TableRow key={lic.id} hover>
//                   <TableCell>{lic.productName}</TableCell>
//                   <TableCell>{lic.vendor}</TableCell>
//                   <TableCell>{lic.licenseType}</TableCell>
//                   <TableCell sx={{ minWidth: 160 }}>
//                     <SeatUsageBar
//                       total={lic.totalEntitlements}
//                       used={lic.entitlements?.length ?? 0}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <ExpiryStatusChip expiry={lic.expiryDate} />
//                   </TableCell>
//                   <TableCell>
//                     {lic.cost} {lic.currency}
//                   </TableCell>
//                   <TableCell align="right">
//                     <IconButton
//                       size="small"
//                       component={Link}
//                       to={`/licenses/${lic.id}`}
//                     >
//                       <OpenInNew fontSize="small" />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {filtered.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center">
//                     No licenses found.
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



// src/pages/licenses/LicensesListPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLicenses } from "./Licenses";
import SeatUsageBar from "./SeatUsageBar";
import { ExpiryStatusChip } from "./StatusChip";
import "./LicenseListPage.css";

export default function LicensesListPage({ role }) {
  const [licenses, setLicenses] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    getLicenses().then(setLicenses).catch(console.error);
  }, []);

  const filtered = licenses.filter(l =>
    `${l.productName} ${l.vendor} ${l.sku}`
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  return (
    <div className="page-container">

      {/* Header */}
      <div className="header-row">
        <h2 className="title">Licenses</h2>

        <div className="actions">
          <div className="search-wrapper">
        
            <input
              type="text"
              className="search-input"
              placeholder="Search product, vendor, SKU..."
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>

          {role === "ITAdmin" && (
            <Link className="btn primary-btn" to="/app/licenses/new">
               Add License
            </Link>
          )}
        </div>
      </div>

      {/* Card */}
      <div className="card">
        <div className="card-body">

          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Vendor</th>
                <th>Type</th>
                <th>Seats</th>
                <th>Expiry</th>
                <th>Cost</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(lic => (
                <tr key={lic.id}>
                  <td>{lic.productName}</td>
                  <td>{lic.vendor}</td>
                  <td>{lic.licenseType}</td>
                  <td>
                    <SeatUsageBar
                      total={lic.totalEntitlements}
                      used={lic.entitlements?.length ?? 0}
                    />
                  </td>
                  <td>
                    <ExpiryStatusChip expiry={lic.expiryDate} />
                  </td>
                  <td>
                    {lic.cost} {lic.currency}
                  </td>
                  <td className="text-right">
                    <Link
                      to={`/licenses/${lic.id}`}
                      className="icon-btn"
                      title="Open"
                    >
                      ↗
                    </Link>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="no-data">
                    No licenses found.
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

