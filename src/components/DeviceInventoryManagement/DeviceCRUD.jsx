// File: DevicesCRUD.jsx
import React, { useState } from "react";
import "./DeviceCRUD.css";

export default function DevicesCRUD() {
  const [activeForm, setActiveForm] = useState("add");

  const [formData, setFormData] = useState({
    deviceId: "",
    hostname: "",
    ownerUserId: "",
    department: "",
    purchaseDate: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (action) => {
    console.log(`${action} submitted:`, formData);

    setFormData({
      deviceId: "",
      hostname: "",
      ownerUserId: "",
      department: "",
      purchaseDate: "",
      status: "Active",
    });
  };

  return (
    <div className="device-crud-container">
      <div className="crud-header">
        <h2>Device Management</h2>

        <nav className="crud-nav">
          <button
            onClick={() => setActiveForm("add")}
            className={activeForm === "add" ? "active" : ""}
          >
            Add
          </button>

          <button
            onClick={() => setActiveForm("update")}
            className={activeForm === "update" ? "active" : ""}
          >
            Update
          </button>

          <button
            onClick={() => setActiveForm("delete")}
            className={activeForm === "delete" ? "active" : ""}
          >
            Delete
          </button>
        </nav>
      </div>

      {/* ADD DEVICE */}
      {activeForm === "add" && (
        <div className="form">
          <h3>Add Device</h3>

          <input
            type="text"
            name="deviceId"
            placeholder="Device ID"
            value={formData.deviceId}
            onChange={handleChange}
          />

          <input
            type="text"
            name="hostname"
            placeholder="Hostname"
            value={formData.hostname}
            onChange={handleChange}
          />

          <input
            type="text"
            name="ownerUserId"
            placeholder="Owner User ID"
            value={formData.ownerUserId}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
          />

          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Retired</option>
            <option>Under Repair</option>
          </select>

          <div className="form-btns">
            <button onClick={() => handleSubmit("Add")}>Add</button>
            <button onClick={() => { }}>Clear</button>
          </div>
        </div>
      )}

      {/* UPDATE DEVICE */}
      {activeForm === "update" && (
        <div className="form">
          <h3>Update Device</h3>

          <input
            type="text"
            name="deviceId"
            placeholder="Device ID (Required)"
            value={formData.deviceId}
            onChange={handleChange}
          />

          <input
            type="text"
            name="hostname"
            placeholder="Hostname"
            value={formData.hostname}
            onChange={handleChange}
          />

          <input
            type="text"
            name="ownerUserId"
            placeholder="Owner User ID"
            value={formData.ownerUserId}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
          />

          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Retired</option>
            <option>Under Repair</option>
          </select>

          <div className="form-btns">
            <button onClick={() => handleSubmit("Update")}>Update</button>
            <button onClick={() => { }}>Clear</button>
          </div>

        </div>
      )}

      {/* DELETE DEVICE */}
      {activeForm === "delete" && (
        <div className="form">
          <h3>Delete Device</h3>

          <input
            type="text"
            name="deviceId"
            placeholder="Enter Device ID to delete"
            value={formData.deviceId}
            onChange={handleChange}
          />

   <div className="form-btns">
          <button onClick={() => handleSubmit("Delete")}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
