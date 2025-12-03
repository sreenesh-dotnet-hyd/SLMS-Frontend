// File: SoftwareCRUD.jsx
import React, { useState, useEffect } from "react";
import "./SoftwareCRUD.css";

export default function SoftwareCRUD() {
  const [activeForm, setActiveForm] = useState("add");
  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    id: null,
    productName: "",
    vendor: "",
    category: "",
    sku: "",
    status: "Active",
  });

  const [catalog, setCatalog] = useState([]);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  const mapStatus = (statusText) => {
    return statusText === "Active" ? 1 : 0;
  };

  useEffect(() => {
    loadCatalog();
  }, []);

  const loadCatalog = async () => {
    try {
      const res = await fetch(`${BASE_URL}/inventory/catalog/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCatalog(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.productName.trim())
      newErrors.productName = "Product Name is required";

    if (!formData.vendor.trim())
      newErrors.vendor = "Vendor is required";

    if (!formData.category.trim())
      newErrors.category = "Category is required";

    if (!formData.sku.trim())
      newErrors.sku = "SKU is required";

    return newErrors;
  };

  const handleSKUSelect = (skuValue) => {
    const item = catalog.find((x) => x.sku === skuValue);

    if (item) {
      setFormData({
        id: item.id,
        productName: item.productName,
        vendor: item.vendor,
        category: item.category,
        sku: item.sku,
        status: item.status === 1 ? "Active" : "Retired",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setFormData({
      id: null,
      productName: "",
      vendor: "",
      category: "",
      sku: "",
      status: "Active",
    });
    setErrors({});
  };

  const handleAdd = async () => {
    const validation = validateForm();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setStatusMessage("Fix errors before submitting.");
      return;
    }

    const payload = {
      ...formData,
      status: mapStatus(formData.status),
    };

    try {
      const res = await fetch(`${BASE_URL}/inventory/catalog/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatusMessage("Software Added Successfully!");
        clearForm();
        loadCatalog();
      } else {
        const errText = await res.text();
        setStatusMessage("Failed to Add Software: " + errText);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    if (!formData.id) {
      setStatusMessage("Select a SKU to update");
      return;
    }

    const validation = validateForm();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setStatusMessage("Fix errors before submitting.");
      return;
    }

    const payload = {
      ...formData,
      status: mapStatus(formData.status),
    };

    try {
      const res = await fetch(
        `${BASE_URL}/inventory/catalog/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        setStatusMessage("Software Updated Successfully!");
        clearForm();
        loadCatalog();
      } else {
        setStatusMessage("Failed to Update Software!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    if (!formData.id) {
      setErrors({ sku: "SKU is required" });
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/inventory/catalog/${formData.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setStatusMessage("Software Deleted Successfully!");
        clearForm();
        loadCatalog();
      } else {
        setStatusMessage("Failed to Delete Software!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>Software Management</h2>
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

      {activeForm === "add" && (
        <div className="form">
          <h3>Add Software</h3>

          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            className={errors.productName ? "input-error" : ""}
          />
          {errors.productName && <p className="error-text">{errors.productName}</p>}

          <input
            type="text"
            name="vendor"
            placeholder="Vendor"
            value={formData.vendor}
            onChange={handleChange}
            className={errors.vendor ? "input-error" : ""}
          />
          {errors.vendor && <p className="error-text">{errors.vendor}</p>}

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? "input-error" : ""}
          />
          {errors.category && <p className="error-text">{errors.category}</p>}

          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={formData.sku}
            onChange={handleChange}
            className={errors.sku ? "input-error" : ""}
          />
          {errors.sku && <p className="error-text">{errors.sku}</p>}

          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Active</option>
            <option>Retired</option>
          </select>

          <div className="form-btns">
            <button onClick={handleAdd}>Add</button>
            <button onClick={clearForm}>Clear</button>
          </div>
        </div>
      )}

      {activeForm === "update" && (
        <div className="form">
          <h3>Update Software</h3>

          <select
            name="sku"
            value={formData.sku}
            onChange={(e) => handleSKUSelect(e.target.value)}
            className={errors.sku ? "input-error" : ""}
          >
            <option value="">Select SKU</option>
            {catalog.map((c) => (
              <option key={c.id} value={c.sku}>
                {c.sku}
              </option>
            ))}
          </select>
          {errors.sku && <p className="error-text">{errors.sku}</p>}

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
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Active</option>
            <option>Retired</option>
          </select>

          <div className="form-btns">
            <button onClick={handleUpdate}>Update</button>
            <button onClick={clearForm}>Clear</button>
          </div>
        </div>
      )}

      {activeForm === "delete" && (
        <div className="form">
          <h3>Delete Software</h3>

          <select
            name="sku"
            value={formData.sku}
            onChange={(e) => handleSKUSelect(e.target.value)}
            className={errors.sku ? "input-error" : ""}
          >
            <option value="">Select SKU</option>
            {catalog.map((c) => (
              <option key={c.id} value={c.sku}>
                {c.sku}
              </option>
            ))}
          </select>
          {errors.sku && <p className="error-text">{errors.sku}</p>}

          {formData.id && (
            <div className="delete-preview">
              <input type="text" disabled value={formData.productName} />
              <input type="text" disabled value={formData.vendor} />
              <input type="text" disabled value={formData.category} />
              <input type="text" disabled value={formData.status} />
            </div>
          )}

          <div className="form-btns">
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}

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
