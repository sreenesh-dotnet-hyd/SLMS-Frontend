// // src/pages/licenses/LicenseFormPage.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Box,
//   Card,
//   CardContent,
//   TextField,
//   Typography,
//   MenuItem,
//   Button,
//   Stack
// } from "@mui/material";
// import dayjs from "dayjs";
// import { createLicense, getLicenseById, updateLicense } from "../api_data/licenses";

// const licenseTypes = ["PerUser", "PerDevice", "Concurrent", "Subscription"];

// export default function LicenseFormPage() {
//   const { id } = useParams();
//   const isEdit = !!id;
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     productName: "",
//     vendor: "",
//     sku: "",
//     licenseType: "PerUser",
//     totalEntitlements: 0,
//     cost: 0,
//     currency: "USD",
//     purchaseDate: "",
//     expiryDate: "",
//     notes: ""
//   });

//   useEffect(() => {
//     if (isEdit) {
//       getLicenseById(id).then(l => {
//         setForm({
//           productName: l.productName ?? "",
//           vendor: l.vendor ?? "",
//           sku: l.sku ?? "",
//           licenseType: l.licenseType ?? "PerUser",
//           totalEntitlements: l.totalEntitlements ?? 0,
//           cost: l.cost ?? 0,
//           currency: l.currency ?? "USD",
//           purchaseDate: l.purchaseDate
//             ? dayjs(l.purchaseDate).format("YYYY-MM-DD")
//             : "",
//           expiryDate: l.expiryDate
//             ? dayjs(l.expiryDate).format("YYYY-MM-DD")
//             : "",
//           notes: l.notes ?? ""
//         });
//       });
//     }
//   }, [id, isEdit]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const payload = {
//       ...form,
//       totalEntitlements: Number(form.totalEntitlements),
//       cost: Number(form.cost),
//       purchaseDate: form.purchaseDate || null,
//       expiryDate: form.expiryDate || null
//     };
//     if (isEdit) {
//       await updateLicense(id, payload);
//     } else {
//       await createLicense(payload);
//     }
//     navigate("/licenses");
//   };

//   return (
//     <Box>
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         {isEdit ? "Edit License" : "Add License"}
//       </Typography>

//       <Card>
//         <CardContent>
//           <Box component="form" onSubmit={handleSubmit}>
//             <Stack spacing={2}>
//               <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
//                 <TextField
//                   label="Product Name"
//                   name="productName"
//                   value={form.productName}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//                 <TextField
//                   label="Vendor"
//                   name="vendor"
//                   value={form.vendor}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </Stack>
//               <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
//                 <TextField
//                   label="SKU"
//                   name="sku"
//                   value={form.sku}
//                   onChange={handleChange}
//                   fullWidth
//                 />
//                 <TextField
//                   select
//                   label="License Type"
//                   name="licenseType"
//                   fullWidth
//                   value={form.licenseType}
//                   onChange={handleChange}
//                 >
//                   {licenseTypes.map(t => (
//                     <MenuItem key={t} value={t}>
//                       {t}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Stack>

//               <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
//                 <TextField
//                   type="number"
//                   label="Total Entitlements"
//                   name="totalEntitlements"
//                   value={form.totalEntitlements}
//                   onChange={handleChange}
//                   fullWidth
//                 />
//                 <TextField
//                   type="number"
//                   label="Cost"
//                   name="cost"
//                   value={form.cost}
//                   onChange={handleChange}
//                   fullWidth
//                 />
//                 <TextField
//                   label="Currency"
//                   name="currency"
//                   value={form.currency}
//                   onChange={handleChange}
//                   fullWidth
//                 />
//               </Stack>

//               <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
//                 <TextField
//                   type="date"
//                   label="Purchase Date"
//                   name="purchaseDate"
//                   value={form.purchaseDate}
//                   onChange={handleChange}
//                   InputLabelProps={{ shrink: true }}
//                   fullWidth
//                 />
//                 <TextField
//                   type="date"
//                   label="Expiry Date"
//                   name="expiryDate"
//                   value={form.expiryDate}
//                   onChange={handleChange}
//                   InputLabelProps={{ shrink: true }}
//                   fullWidth
//                 />
//               </Stack>

//               <TextField
//                 label="Notes"
//                 name="notes"
//                 value={form.notes}
//                 onChange={handleChange}
//                 fullWidth
//                 multiline
//                 minRows={3}
//               />

//               <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
//                 <Button
//                   variant="text"
//                   onClick={() => navigate(-1)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button type="submit" variant="contained">
//                   Save
//                 </Button>
//               </Box>
//             </Stack>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { createLicense, getLicenseById, updateLicense } from "../api_data/licenses";
import "./license-form.css"; // <-- CSS file

const licenseTypes = ["PerUser", "PerDevice", "Concurrent", "Subscription"];

export default function LicenseFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    productName: "",
    vendor: "",
    sku: "",
    licenseType: "PerUser",
    totalEntitlements: 0,
    cost: 0,
    currency: "USD",
    purchaseDate: "",
    expiryDate: "",
    notes: ""
  });

  useEffect(() => {
    if (isEdit) {
      getLicenseById(id).then(l => {
        setForm({
          productName: l.productName ?? "",
          vendor: l.vendor ?? "",
          sku: l.sku ?? "",
          licenseType: l.licenseType ?? "PerUser",
          totalEntitlements: l.totalEntitlements ?? 0,
          cost: l.cost ?? 0,
          currency: l.currency ?? "USD",
          purchaseDate: l.purchaseDate
            ? dayjs(l.purchaseDate).format("YYYY-MM-DD")
            : "",
          expiryDate: l.expiryDate
            ? dayjs(l.expiryDate).format("YYYY-MM-DD")
            : "",
          notes: l.notes ?? ""
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      ...form,
      totalEntitlements: Number(form.totalEntitlements),
      cost: Number(form.cost),
      purchaseDate: form.purchaseDate || null,
      expiryDate: form.expiryDate || null
    };

    if (isEdit) {
      await updateLicense(id, payload);
    } else {
      await createLicense(payload);
    }

    navigate("/licenses");
  };

  return (
    <div className="page-container">
      <h2 className="title">{isEdit ? "Edit License" : "Add License"}</h2>

      <div className="card">
        <form className="form" onSubmit={handleSubmit}>
          
          <div className="row">
            <div className="field">
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                value={form.productName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Vendor</label>
              <input
                type="text"
                name="vendor"
                value={form.vendor}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>SKU</label>
              <input
                type="text"
                name="sku"
                value={form.sku}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>License Type</label>
              <select
                name="licenseType"
                value={form.licenseType}
                onChange={handleChange}
              >
                {licenseTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>Total Entitlements</label>
              <input
                type="number"
                name="totalEntitlements"
                value={form.totalEntitlements}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Cost</label>
              <input
                type="number"
                name="cost"
                value={form.cost}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Currency</label>
              <input
                type="text"
                name="currency"
                value={form.currency}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>Purchase Date</label>
              <input
                type="date"
                name="purchaseDate"
                value={form.purchaseDate}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label>Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          <div className="actions">
            <button
              type="button"
              className="btn secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button type="submit" className="btn primary">
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
