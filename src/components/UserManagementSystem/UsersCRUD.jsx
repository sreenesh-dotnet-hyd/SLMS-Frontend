// File: UsersCRUD.jsx
import React, { useState, useEffect } from "react";
import "./UserCRUD.css";

export default function UsersCRUD() {
  const [activeForm, setActiveForm] = useState("add");
  const token = localStorage.getItem("token");

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log("BASE URL:", BASE_URL);

  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    userId: "",
    displayName: "",
    department: "",
    location: "",
    createdAt: new Date().toISOString(),
  });

  const [usersList, setUsersList] = useState([]);

  // Load existing users
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/inventory/users/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUsersList(data);
      }
    } catch (err) {
      console.log("Load Users Error:", err);
    }
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.userId.trim()) newErrors.userId = "User ID is required";
    if (!formData.displayName.trim()) newErrors.displayName = "Display Name is required";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    return newErrors;
  };

  // Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Clear Inputs
  const clearForm = () => {
    setFormData({
      userId: "",
      displayName: "",
      department: "",
      location: "",
      createdAt: new Date().toISOString(),
    });
    setErrors({});
  };

  // Add User
  const handleAdd = async () => {
    const validation = validateForm();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setStatusMessage("Fix errors before submitting.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/inventory/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatusMessage("User Added Successfully!");
        clearForm();
        loadUsers();
      } else {
        setStatusMessage("Failed to Add User!");
      }
    } catch (err) {
      console.log("Add Error:", err);
      setStatusMessage("Error adding user!");
    }
  };

  // Update User
  const handleUpdate = async () => {
    const validation = validateForm();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setStatusMessage("Fix errors before submitting.");
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/inventory/users/${formData.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        setStatusMessage("User Updated Successfully!");
        clearForm();
        loadUsers();
      } else {
        setStatusMessage("Failed to Update User!");
      }
    } catch (err) {
      console.log("Update Error:", err);
      setStatusMessage("Error updating user!");
    }
  };

  // Delete User
  const handleDelete = async () => {
    if (!formData.userId.trim()) {
      setErrors({ userId: "User ID is required" });
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/inventory/users/${formData.userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setStatusMessage("User Deleted Successfully!");
        clearForm();
        loadUsers();
      } else {
        setStatusMessage("Failed to Delete User!");
      }
    } catch (err) {
      console.log("Delete Error:", err);
      setStatusMessage("Error deleting user!");
    }
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>User Management</h2>

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

      {/* ---------- ADD USER ---------- */}
      {activeForm === "add" && (
        <div className="form">
          <h3>Add User</h3>

          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={formData.userId}
            onChange={handleChange}
            className={errors.userId ? "input-error" : ""}
          />
          {errors.userId && <p className="error-text">{errors.userId}</p>}

          <input
            type="text"
            name="displayName"
            placeholder="Display Name"
            value={formData.displayName}
            onChange={handleChange}
            className={errors.displayName ? "input-error" : ""}
          />
          {errors.displayName && <p className="error-text">{errors.displayName}</p>}

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className={errors.department ? "input-error" : ""}
          />
          {errors.department && <p className="error-text">{errors.department}</p>}

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className={errors.location ? "input-error" : ""}
          />
          {errors.location && <p className="error-text">{errors.location}</p>}

          <div className="form-btns">
            <button onClick={handleAdd}>Add</button>
            <button onClick={clearForm}>Clear</button>
          </div>
        </div>
      )}

      {/* ---------- UPDATE USER ---------- */}
      {activeForm === "update" && (
        <div className="form">
          <h3>Update User</h3>

          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={formData.userId}
            onChange={handleChange}
            className={errors.userId ? "input-error" : ""}
          />
          {errors.userId && <p className="error-text">{errors.userId}</p>}

          <input
            type="text"
            name="displayName"
            placeholder="Display Name"
            value={formData.displayName}
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
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />

          <div className="form-btns">
            <button onClick={handleUpdate}>Update</button>
            <button onClick={clearForm}>Clear</button>
          </div>
        </div>
      )}

      {/* ---------- DELETE USER ---------- */}
      {activeForm === "delete" && (
        <div className="form">
          <h3>Delete User</h3>

          <input
            type="text"
            name="userId"
            placeholder="Enter User ID to Delete"
            value={formData.userId}
            onChange={handleChange}
            className={errors.userId ? "input-error" : ""}
          />
          {errors.userId && <p className="error-text">{errors.userId}</p>}

          <div className="form-btns">
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}

      {/* ---------- Status Message ---------- */}
      {statusMessage && (
        <div
          className="status-device-message"
          style={{
            backgroundColor: statusMessage.includes("Successfully")
              ? "#d4edda"
              : "#f8d7da",
            color: statusMessage.includes("Successfully")
              ? "#69a76c"
              : "#c95a5a",
          }}
        >
          {statusMessage}
        </div>
      )}
    </div>
  );
}
