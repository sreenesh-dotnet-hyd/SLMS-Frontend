// File: SoftwareCRUD.jsx
import React, { useState } from "react";
import "./SoftwareCRUD.css";

export default function SoftwareCRUD() {
  const [activeForm, setActiveForm] = useState("add");
  const [formData, setFormData] = useState({ productName: "", vendor: "", category: "", sku: "", status: "Active" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (action) => {
    console.log(`${action} submitted:`, formData);
    setFormData({ productName: "", vendor: "", category: "", sku: "", status: "Active" });
  };

  return (
    <div className="crud-container">
      <h2>Software Management</h2>
      <nav className="crud-nav">
        <button onClick={() => setActiveForm("add")} className={activeForm === "add" ? "active" : ""}>Add</button>
        <button onClick={() => setActiveForm("update")} className={activeForm === "update" ? "active" : ""}>Update</button>
        <button onClick={() => setActiveForm("delete")} className={activeForm === "delete" ? "active" : ""}>Delete</button>
      </nav>

      {activeForm === "add" && (
        <div className="form">
          <h3>Add Software</h3>
          <input type="text" name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} />
          <input type="text" name="vendor" placeholder="Vendor" value={formData.vendor} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
          <input type="text" name="sku" placeholder="SKU" value={formData.sku} onChange={handleChange} />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Active</option>
            <option>Retired</option>
          </select>
          <button onClick={() => handleSubmit("Add")}>Add</button>
        </div>
      )}

      {activeForm === "update" && (
        <div className="form">
          <h3>Update Software</h3>
          <input type="text" name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} />
          <input type="text" name="vendor" placeholder="Vendor" value={formData.vendor} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
          <input type="text" name="sku" placeholder="SKU" value={formData.sku} onChange={handleChange} />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Active</option>
            <option>Retired</option>
          </select>
          <button onClick={() => handleSubmit("Update")}>Update</button>
        </div>
      )}

      {activeForm === "delete" && (
        <div className="form">
          <h3>Delete Software</h3>
          <input type="text" name="sku" placeholder="Enter SKU to delete" value={formData.sku} onChange={handleChange} />
          <button onClick={() => handleSubmit("Delete")}>Delete</button>
        </div>
      )}
    </div>
  );
}