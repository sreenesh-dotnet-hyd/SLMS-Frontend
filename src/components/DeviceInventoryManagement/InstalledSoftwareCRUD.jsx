// File: InstalledSoftwareCRUD.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./InstalledSoftwareCRUD.css";

export default function InstalledSoftwareCRUD({ device, mode }) {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");
  const performedBy = localStorage.getItem("username") || "sreenesh";

  const { deviceId: routeDeviceId } = useParams();
  const numericDeviceId = Number(routeDeviceId) || 0;

  const [formData, setFormData] = useState({
    productName: "",
    vendor: "",
    version: "",
    installDate: new Date().toISOString().slice(0, 10),
    status: "Active",
  });

  const [licenses, setLicenses] = useState([]);
  const [selectedLicenseId, setSelectedLicenseId] = useState("");
  const [installations, setInstallations] = useState([]);
  const [selectedInstallId, setSelectedInstallId] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // LOAD ALL REQUIRED DATA
  useEffect(() => {
    loadLicenses();
    loadInstallations();
  }, [numericDeviceId]);


  // 🔹 Loads only device installations
  const loadInstallations = async () => {
    try {
      const res = await fetch(`${BASE_URL}/inventory/installations/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      let data = await res.json();
      data = data.filter((item) => item.deviceId === numericDeviceId);

      setInstallations(data);
    } catch (err) {
      console.error(err);
    }
  };


  const loadLicenses = async () => {
    try {
      const res = await fetch(`${BASE_URL}/inventory/licenses/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) setLicenses(await res.json());
    } catch (err) {
      console.error(err);
    }
  };


  const safeError = async (res) => {
    try {
      const body = await res.json();
      return body?.message || body?.error || "Error occurred";
    } catch {
      return await res.text();
    }
  };


  const setStatus = (msg) => {
    setStatusMessage(msg);
    if (msg) setTimeout(() => setStatusMessage(""), 5000);
  };


  const resetForm = () => {
    setFormData({
      productName: "",
      vendor: "",
      version: "",
      installDate: new Date().toISOString().slice(0, 10),
      status: "Active",
    });

    setSelectedInstallId("");
    setSelectedLicenseId("");
  };


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  // LICENSE → Fill rest
  const handleLicenseChange = (e) => {
    const val = e.target.value;
    setSelectedLicenseId(val);

    const lic = licenses.find((l) => String(l.licenseId) === val);
    if (lic) {
      setFormData((prev) => ({
        ...prev,
        productName: lic.productName,
        vendor: lic.vendor,
        version: lic.sku || prev.version,
      }));
    }
  };


  // INSTALLATION → fill everything
  const handleInstallSelectionChange = (e) => {
    const id = e.target.value;
    setSelectedInstallId(id);

    const inst = installations.find((i) => String(i.id) === id);
    if (!inst) return;

    const lic = licenses.find(
      (l) => Number(l.licenseId) === Number(inst.licenseId)
    );

    setFormData({
      productName: inst.productName || lic?.productName || "",
      vendor: lic?.vendor || "",
      version: inst.version || lic?.sku || "",
      installDate: inst.installDate
        ? new Date(inst.installDate).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      status: "Active",
    });

    setSelectedLicenseId(lic?.licenseId || "");
  };


  /** INSTALL */
  const sendInstall = async () => {
    if (!selectedLicenseId) return setStatus("Install failed: Select license.");

    const payload = {
      deviceId: numericDeviceId,
      licenseId: Number(selectedLicenseId),
      productName: formData.productName.trim(),
      version: formData.version.trim(),
      installDate: new Date(formData.installDate).toISOString(),
    };

    try {
      const res = await fetch(
        `${BASE_URL}/inventory/installations/install?performedBy=${performedBy}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        setStatus("Installed successfully!");
        await loadInstallations();
        resetForm();
        return;
      }

      setStatus("Install failed: " + (await safeError(res)));

    } catch {
      setStatus("Install failed!");
    }
  };


  /** DELETE */
  const sendUninstall = async () => {
  const inst = installations.find(i => String(i.id) === selectedInstallId);

  if (!inst)
    return setStatus("Delete failed: Select installed software.");

  try {
    const res = await fetch(
      `${BASE_URL}/inventory/installations/${inst.licenseId}/uninstall?performedBy=${performedBy}&deviceId=${inst.deviceId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (res.ok) {
      setStatus("Deleted successfully!");
      await loadInstallations();
      resetForm();
      return;
    }

    setStatus("Delete failed: " + (await safeError(res)));
  } catch {
    setStatus("Delete failed!");
  }
};



  /** UPDATE (Uninstall then Install) */
  const sendUpdate = async () => {
    if (!selectedInstallId)
      return setStatus("Update failed: Select installed software.");

    await sendUninstall();
    await sendInstall();
    setStatus("Updated successfully!");
  };


  const handleSubmit = () => {
    if (mode === "add") return sendInstall();
    if (mode === "update") return sendUpdate();
    if (mode === "delete") return sendUninstall();
  };


  return (
    <div className="isc-container">

      {/* ADD */}
      {mode === "add" && (
        <div className="isc-form">
          <select
            value={selectedLicenseId}
            onChange={handleLicenseChange}
          >
            <option value="">Select License</option>
            {licenses.map((lic) => (
              <option key={lic.licenseId} value={lic.licenseId}>
                {lic.productName} ({lic.vendor})
              </option>
            ))}
          </select>

          <input
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
          />

          <input
            name="vendor"
            placeholder="Vendor"
            value={formData.vendor}
            onChange={handleChange}
          />

          <input
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

          <button onClick={handleSubmit}>Install</button>
        </div>
      )}

      {/* UPDATE */}
      {mode === "update" && (
        <div className="isc-form">
          <select
            value={selectedInstallId}
            onChange={handleInstallSelectionChange}
          >
            <option value="">Select Installed Software</option>
            {installations.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {inst.productName} ({inst.version})
              </option>
            ))}
          </select>

          <input name="productName" value={formData.productName} onChange={handleChange} />
          <input name="vendor" value={formData.vendor} onChange={handleChange} />
          <input name="version" value={formData.version} onChange={handleChange} />
          <input type="date" name="installDate" value={formData.installDate} onChange={handleChange} />

          <button onClick={handleSubmit}>Update</button>
        </div>
      )}

      {/* DELETE */}
      {mode === "delete" && (
        <div className="isc-form">
          <select
            value={selectedInstallId}
            onChange={handleInstallSelectionChange}
          >
            <option value="">Select Installed Software</option>
            {installations.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {inst.productName} ({inst.version})
              </option>
            ))}
          </select>

          <input name="productName" value={formData.productName} readOnly />
          <input name="version" value={formData.version} readOnly />

          <button onClick={handleSubmit}>Delete</button>
        </div>
      )}

      {/* STATUS */}
      {statusMessage && (
        <div
          className={`isc-status ${
            statusMessage.toLowerCase().includes("success")
              ? "ok"
              : "bad"
          }`}
        >
          {statusMessage}
        </div>
      )}
    </div>
  );
}
