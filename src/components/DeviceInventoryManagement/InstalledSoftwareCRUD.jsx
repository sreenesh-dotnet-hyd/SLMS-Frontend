// // File: InstalledSoftwareCRUD.jsx
import { useState } from "react";
import "./InstalledSoftwareCRUD.css";

// export default function InstalledSoftwareCRUD({ device }) {
//   const [activeForm, setActiveForm] = useState("add");
//   const [formData, setFormData] = useState({
//     productName: "",
//     vendor: "",
//     version: "",
//     installDate: new Date().toISOString().slice(0, 10),
//     status: "Active",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (action) => {
//     console.log(`${action} submitted for device ${device.deviceId}:`, formData);
//     setFormData({
//       productName: "",
//       vendor: "",
//       version: "",
//       installDate: new Date().toISOString().slice(0, 10),
//       status: "Active",
//     });
//   };

//   return (
//     <div className="isc-container">
//       <h2>Manage Installed Software for {device.hostname}</h2>

//       <nav className="isc-nav">
//         <button
//           onClick={() => setActiveForm("add")}
//           className={activeForm === "add" ? "active" : ""}
//         >
//           Add
//         </button>
//         <button
//           onClick={() => setActiveForm("update")}
//           className={activeForm === "update" ? "active" : ""}
//         >
//           Update
//         </button>
//         <button
//           onClick={() => setActiveForm("delete")}
//           className={activeForm === "delete" ? "active" : ""}
//         >
//           Remove
//         </button>
//       </nav>

//       {activeForm === "add" && (
//         <div className="isc-form">
//           <h3>Add Software</h3>
//           <input
//             type="text"
//             name="productName"
//             placeholder="Product Name"
//             value={formData.productName}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="vendor"
//             placeholder="Vendor"
//             value={formData.vendor}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="version"
//             placeholder="Version"
//             value={formData.version}
//             onChange={handleChange}
//           />
//           <input
//             type="date"
//             name="installDate"
//             value={formData.installDate}
//             onChange={handleChange}
//           />
//           <select name="status" value={formData.status} onChange={handleChange}>
//             <option>Active</option>
//             <option>Retired</option>
//           </select>
//           <button onClick={() => handleSubmit("Add")}>Add</button>
//         </div>
//       )}

//       {activeForm === "update" && (
//         <div className="isc-form">
//           <h3>Update Software</h3>
//           <input
//             type="text"
//             name="productName"
//             placeholder="Product Name"
//             value={formData.productName}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="vendor"
//             placeholder="Vendor"
//             value={formData.vendor}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="version"
//             placeholder="Version"
//             value={formData.version}
//             onChange={handleChange}
//           />
//           <input
//             type="date"
//             name="installDate"
//             value={formData.installDate}
//             onChange={handleChange}
//           />
//           <select name="status" value={formData.status} onChange={handleChange}>
//             <option>Active</option>
//             <option>Retired</option>
//           </select>
//           <button onClick={() => handleSubmit("Update")}>Update</button>
//         </div>
//       )}

//       {activeForm === "delete" && (
//         <div className="isc-form">
//           <h3>Remove Software</h3>
//           <input
//             type="text"
//             name="productName"
//             placeholder="Product Name to remove"
//             value={formData.productName}
//             onChange={handleChange}
//           />
//           <button onClick={() => handleSubmit("Delete")}>Remove</button>
//         </div>
//       )}
//     </div>
//   );
// }

export default function InstalledSoftwareCRUD({ device, mode }) {
  const [formData, setFormData] = useState({
    productName: "",
    vendor: "",
    version: "",
    installDate: new Date().toISOString().slice(0, 10),
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (action) => {
    console.log(`${action} submitted for device ${device.deviceId}:`, formData);
  };

  return (
    <div className="isc-container">
  

      {mode === "add" && (
        <div className="isc-form">
       
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="vendor"
            placeholder="Vendor"
            value={formData.vendor}
            onChange={handleChange}
          />
          <input
            type="text"
            name="version"
            placeholder="Version"
            value={formData.version}
            onChange={handleChange}
          />
          <input
            type="date"
            name="installDate"
            value={formData.installDate}
            onChange={handleChange}
          />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Active</option>
            <option>Retired</option>
          </select>

          <button onClick={() => handleSubmit("Add")}>Add</button>
        </div>
      )}

      {mode === "update" && (
        <div className="isc-form">
      

          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="vendor"
            placeholder="Vendor"
            value={formData.vendor}
            onChange={handleChange}
          />
          <input
            type="text"
            name="version"
            placeholder="Version"
            value={formData.version}
            onChange={handleChange}
          />
          <input
            type="date"
            name="installDate"
            value={formData.installDate}
            onChange={handleChange}
          />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Active</option>
            <option>Retired</option>
          </select>

          <button onClick={() => handleSubmit("Update")}>Update</button>
        </div>
      )}

      {mode === "delete" && (
        <div className="isc-form">

          <input
            type="text"
            name="productName"
            placeholder="Product to remove"
            value={formData.productName}
            onChange={handleChange}
          />
          <button onClick={() => handleSubmit("Delete")}>Remove</button>
        </div>
      )}
    </div>
  );
}

