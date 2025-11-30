// // src/pages/entitlements/AssignEntitlementPage.jsx
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   TextField,
//   MenuItem,
//   Stack,
//   Button,
//   ToggleButton,
//   ToggleButtonGroup
// } from "@mui/material";
// import { getLicenses } from "../api_data/licenses";
// import { getUsers, getDevices } from "../api_data/lookups";
// import { createEntitlement } from "../api_data/entitlements";

// export default function AssignEntitlementPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const preselectedLicenseId = location.state?.licenseId ?? null;

//   const [licenses, setLicenses] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [devices, setDevices] = useState([]);
//   const [targetType, setTargetType] = useState("user");
//   const [form, setForm] = useState({
//     licenseId: preselectedLicenseId || "",
//     userId: "",
//     deviceId: "",
//     expiresAt: ""
//   });

//   useEffect(() => {
//     getLicenses().then(setLicenses);
//     getUsers().then(setUsers);
//     getDevices().then(setDevices);
//   }, []);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleTargetTypeChange = (_, value) => {
//     if (!value) return;
//     setTargetType(value);
//     setForm(prev => ({
//       ...prev,
//       userId: value === "user" ? prev.userId : "",
//       deviceId: value === "device" ? prev.deviceId : ""
//     }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const payload = {
//       licenseId: Number(form.licenseId),
//       userId: targetType === "user" ? Number(form.userId) : null,
//       deviceId: targetType === "device" ? Number(form.deviceId) : null,
//       expiresAt: form.expiresAt || null
//     };
//     await createEntitlement(payload);
//     navigate("/entitlements");
//   };

//   return (
//     <Box>
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Assign License
//       </Typography>
//       <Card>
//         <CardContent>
//           <Box component="form" onSubmit={handleSubmit}>
//             <Stack spacing={3}>
//               <TextField
//                 select
//                 label="License"
//                 name="licenseId"
//                 required
//                 value={form.licenseId}
//                 onChange={handleChange}
//                 fullWidth
//               >
//                 {licenses.map(l => (
//                   <MenuItem key={l.id} value={l.id}>
//                     {l.productName} – {l.vendor}
//                   </MenuItem>
//                 ))}
//               </TextField>

//               <Stack spacing={1}>
//                 <Typography variant="body2">Assign to</Typography>
//                 <ToggleButtonGroup
//                   value={targetType}
//                   exclusive
//                   onChange={handleTargetTypeChange}
//                 >
//                   <ToggleButton value="user">User</ToggleButton>
//                   <ToggleButton value="device">Device</ToggleButton>
//                 </ToggleButtonGroup>
//               </Stack>

//               {targetType === "user" ? (
//                 <TextField
//                   select
//                   label="User"
//                   name="userId"
//                   value={form.userId}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 >
//                   {users.map(u => (
//                     <MenuItem key={u.id} value={u.id}>
//                       {u.displayName} ({u.userId})
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               ) : (
//                 <TextField
//                   select
//                   label="Device"
//                   name="deviceId"
//                   value={form.deviceId}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 >
//                   {devices.map(d => (
//                     <MenuItem key={d.id} value={d.id}>
//                       {d.hostname} ({d.deviceId})
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               )}

//               <TextField
//                 type="date"
//                 label="Entitlement Expiry"
//                 name="expiresAt"
//                 value={form.expiresAt}
//                 onChange={handleChange}
//                 InputLabelProps={{ shrink: true }}
//                 fullWidth
//               />

//               <Stack direction="row" justifyContent="flex-end" spacing={2}>
//                 <Button onClick={() => navigate(-1)}>Cancel</Button>
//                 <Button type="submit" variant="contained">
//                   Assign
//                 </Button>
//               </Stack>
//             </Stack>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLicenses } from "../api_data/licenses";
import { getUsers, getDevices } from "../api_data/lookups";
import { createEntitlement } from "../api_data/entitlements";
import "./assign-entitlement.css"; // <-- CSS

export default function AssignEntitlementPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedLicenseId = location.state?.licenseId ?? null;

  const [licenses, setLicenses] = useState([]);
  const [users, setUsers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [targetType, setTargetType] = useState("user");
  const [form, setForm] = useState({
    licenseId: preselectedLicenseId || "",
    userId: "",
    deviceId: "",
    expiresAt: ""
  });

  useEffect(() => {
    getLicenses().then(setLicenses);
    getUsers().then(setUsers);
    getDevices().then(setDevices);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTargetTypeChange = value => {
    setTargetType(value);
    setForm(prev => ({
      ...prev,
      userId: value === "user" ? prev.userId : "",
      deviceId: value === "device" ? prev.deviceId : ""
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      licenseId: Number(form.licenseId),
      userId: targetType === "user" ? Number(form.userId) : null,
      deviceId: targetType === "device" ? Number(form.deviceId) : null,
      expiresAt: form.expiresAt || null
    };
    await createEntitlement(payload);
    navigate("/entitlements");
  };

  return (
    <div className="page-container">
      <h2 className="title">Assign License</h2>

      <div className="card">
        <form className="form" onSubmit={handleSubmit}>

          {/* License Dropdown */}
          <div className="field">
            <label>License</label>
            <select
              name="licenseId"
              value={form.licenseId}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select license</option>
              {licenses.map(l => (
                <option key={l.id} value={l.id}>
                  {l.productName} – {l.vendor}
                </option>
              ))}
            </select>
          </div>

          {/* Toggle buttons */}
          <div className="toggle-section">
            <span className="toggle-label">Assign to</span>
            <div className="toggle-group">
              <button
                type="button"
                className={`toggle-btn ${targetType === "user" ? "active" : ""}`}
                onClick={() => handleTargetTypeChange("user")}
              >
                User
              </button>
              <button
                type="button"
                className={`toggle-btn ${targetType === "device" ? "active" : ""}`}
                onClick={() => handleTargetTypeChange("device")}
              >
                Device
              </button>
            </div>
          </div>

          {/* User/Device Dropdown */}
          {targetType === "user" ? (
            <div className="field">
              <label>User</label>
              <select
                name="userId"
                value={form.userId}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select user</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.displayName} ({u.userId})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="field">
              <label>Device</label>
              <select
                name="deviceId"
                value={form.deviceId}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select device</option>
                {devices.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.hostname} ({d.deviceId})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Expiry */}
          <div className="field">
            <label>Entitlement Expiry</label>
            <input
              type="date"
              name="expiresAt"
              value={form.expiresAt}
              onChange={handleChange}
            />
          </div>

          {/* Actions */}
          <div className="actions">
            <button type="button" className="btn secondary" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn primary">Assign</button>
          </div>

        </form>
      </div>
    </div>
  );
}
