// File: DevicesCRUD.jsx
import React, { useState, useEffect } from "react";
import "./DeviceCRUD.css";

export default function DevicesCRUD() {
  const [activeForm, setActiveForm] = useState("add");
  const token = localStorage.getItem("token")
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    deviceId: "",
    deviceDisplayId: "",
    hostname: "",
    ownerUserId: "",
    department: "",
    purchaseDate: new Date().toISOString(),
    status: "Active",
  });

  useEffect(() => {
    loadUsersData();
  }, []);

  const [users, setUsers] = useState([]);
  
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log("BASE URL:", BASE_URL);
  const loadUsersData = async () => {
    const res = await fetch(`${BASE_URL}/inventory/users`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );
    const data = await res.json();
    setUsers(data);
    console.log(data);
  }


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.deviceId.trim()) newErrors.deviceId = "Device ID is required";
    if (!formData.deviceDisplayId.trim()) newErrors.deviceDisplayId = "Display Display ID is required";
    if (!formData.hostname.trim()) newErrors.hostname = "Hostname is required";
    if (!formData.ownerUserId.trim()) newErrors.ownerUserId = "Owner is required";
    if (!formData.department.trim()) newErrors.department = "Department is required";

    return newErrors;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-fill when ownerUserId changes
    if (name === "ownerUserId") {
      const selectedUser = users.find((u) => u.userId === value);

      setFormData((prev) => ({
        ...prev,
        ownerUserId: value,
        department: selectedUser?.department || "",
        location: selectedUser?.location || "",
      }));

      return; // stop further processing
    }

    // Normal updates for all other fields
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleAddSubmit = async (action) => {

    const validation = validateForm();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setStatusMessage("Please fix the errors before submitting.");
      return;
    }

    try {

      console.log(JSON.stringify({
        id: Number(formData.deviceId),
        deviceId: formData.deviceDisplayId,
        hostname: formData.hostname,
        ownerUserId: formData.ownerUserId,
        department: formData.department,
        location: formData.location || "",
        lastSeen: new Date().toISOString()
      }));
      const res = await fetch(`${BASE_URL}/inventory/devices/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          id: Number(formData.deviceId),
          deviceId: formData.deviceDisplayId,
          hostname: formData.hostname,
          ownerUserId: formData.ownerUserId,
          department: formData.department,
          location: formData.location || "",
          lastSeen: new Date().toISOString()
        })
      })


      if (res.ok) {
        setStatusMessage("Status: Device added successfully!");
        setErrors({});

        // Clear form
        setFormData({
          deviceId: "",
          deviceDisplayId: "",
          hostname: "",
          ownerUserId: "",
          department: "",
          purchaseDate: "",
          status: "Active",
        });


        // Auto-hide message after 3 seconds
        setTimeout(() => setStatusMessage(""), 10000);
      } else {
        setStatusMessage("Status: Failed to add device!");
      }

    } catch (err) {
      console.log(err);
    }

  };


const handleUpdateSubmit = async (action) => {

    const validation = validateForm();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setStatusMessage("Please fix the errors before submitting.");
      return;
    }

    try {

      console.log(JSON.stringify({
        id: Number(formData.deviceId),
        deviceId: formData.deviceDisplayId,
        hostname: formData.hostname,
        ownerUserId: formData.ownerUserId,
        department: formData.department,
        location: formData.location || "",
        lastSeen: new Date().toISOString()
      }))
      const res = await fetch(`${BASE_URL}/inventory/devices/${Number(formData.deviceId)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          id: Number(formData.deviceId),
          deviceId: formData.deviceDisplayId,
          hostname: formData.hostname,
          ownerUserId: formData.ownerUserId,
          department: formData.department,
          location: formData.location || "",
          lastSeen: new Date().toISOString()
        })
      })


      if (res.ok) {
        setStatusMessage("Status: Device updated successfully!");
        setErrors({});

        // Clear form
        setFormData({
          deviceId: "",
          deviceDisplayId: "",
          hostname: "",
          ownerUserId: "",
          department: "",
          purchaseDate: "",
          status: "Active",
        });


        // Auto-hide message after 3 seconds
        setTimeout(() => setStatusMessage(""), 10000);
      } else {
        setStatusMessage("Status: Failed to update device!");
      }

    } catch (err) {
      console.log(err);
    }

  };


const handleDeleteSubmit = async () => {
  try {
    const res = await fetch(
      `${BASE_URL}/inventory/devices/${Number(formData.deviceId)}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    if (res.ok) {
      setStatusMessage("Status: Device deleted successfully!");
      setFormData({ deviceId: "" });
      setErrors({});
    } else {
      setStatusMessage("Status: Failed to delete device!");
    }

  } catch (err) {
    console.log(err);
  }
};

  const clearFormInputs = () => {
    setFormData({
      deviceId: "",
      deviceDisplayId: "",
      hostname: "",
      ownerUserId: "",
      department: "",
      purchaseDate: "",
      status: "Active"   // default selected value
    });
  };



  // Default handler




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
            className={errors.deviceId ? "input-error" : ""}
          />
          {errors.deviceId && <p className="error-text">{errors.deviceId}</p>}

          <input
            type="text"
            name="deviceDisplayId"
            placeholder="Device Display ID"
            value={formData.deviceDisplayId}
            onChange={handleChange}
            className={errors.deviceDisplayId ? "input-error" : ""}
          />
          {errors.deviceDisplayId && <p className="error-text">{errors.deviceDisplayId}</p>}

          <input
            type="text"
            name="hostname"
            placeholder="Hostname"
            value={formData.hostname}
            onChange={handleChange}
            className={errors.hostname ? "input-error" : ""}
          />
          {errors.hostname && <p className="error-text">{errors.hostname}</p>}

          <select
            name="ownerUserId"
            value={formData.ownerUserId}
            onChange={handleChange}
            className={errors.ownerUserId ? "input-error" : ""}
          >
            <option value="">Select Owner</option>
            {users.map((u) => (
              <option key={u.id} value={u.userId}>
                {u.userId} {u.displayName} {u.department} {u.location}
              </option>
            ))}
          </select>
          {errors.ownerUserId && <p className="error-text">{errors.ownerUserId}</p>}

          <div className="form-btns">
            <button onClick={() => handleAddSubmit("Add")}>Add</button>
            <button onClick={clearFormInputs}>Clear</button>
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
            placeholder="Device ID"
            value={formData.deviceId}
            onChange={handleChange}
            className={errors.deviceId ? "input-error" : ""}
          />
          {errors.deviceId && <p className="error-text">{errors.deviceId}</p>}

          <input
            type="text"
            name="deviceDisplayId"
            placeholder="Device Display ID"
            value={formData.deviceDisplayId}
            onChange={handleChange}
            className={errors.deviceDisplayId ? "input-error" : ""}
          />
          {errors.deviceDisplayId && <p className="error-text">{errors.deviceDisplayId}</p>}

          <input
            type="text"
            name="hostname"
            placeholder="Hostname"
            value={formData.hostname}
            onChange={handleChange}
            className={errors.hostname ? "input-error" : ""}
          />
          {errors.hostname && <p className="error-text">{errors.hostname}</p>}

          <select
            name="ownerUserId"
            value={formData.ownerUserId}
            onChange={handleChange}
            className={errors.ownerUserId ? "input-error" : ""}
          >
            <option value="">Select Owner</option>
            {users.map((u) => (
              <option key={u.id} value={u.userId}>
                {u.userId} {u.displayName} {u.department} {u.location}
              </option>
            ))}
          </select>
          {errors.ownerUserId && <p className="error-text">{errors.ownerUserId}</p>}

          <div className="form-btns">
            <button onClick={() => handleUpdateSubmit("Update")}>Update</button>
            <button onClick={clearFormInputs}>Clear</button>
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
            <button onClick={() => handleDeleteSubmit("Delete")}>Delete</button>
          </div>
        </div>
      )}

      {statusMessage && (
        <div className="status-device-message"
          style={{
            backgroundColor: statusMessage.includes("successfully!")
              ? "#d4edda"
              : "#f8d7da",

            color: statusMessage.includes("successfully!")
              ? "#64da80ff"
              : "#d3747cff"
          }}
        >
          {statusMessage}
        </div>)
      }
    </div>
  );
}
