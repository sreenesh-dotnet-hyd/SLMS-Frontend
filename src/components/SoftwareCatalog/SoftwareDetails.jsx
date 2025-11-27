// File: SoftwareDetails.jsx
import React, { useState, useEffect } from "react";
import "./SoftwareDetails.css";

export default function SoftwareDetails({ softwareId = 1 }) {
    const [details, setDetails] = useState(null);
    const [licenses, setLicenses] = useState([]);
    const [installations, setInstallations] = useState([]);
    const [entitlements, setEntitlements] = useState([]);
    const [installHistory, setInstallHistory] = useState([]);

    useEffect(() => {
        // --------- DUMMY INSTALLATION HISTORY ---------
        const dummyInstallHistory = [
            {
                id: 1,
                deviceId: "LPT-2211",
                action: "Installed",
                version: "25.0",
                timestamp: "2024-01-11T09:15:00Z"
            },
            {
                id: 2,
                deviceId: "LPT-2211",
                action: "Updated",
                version: "25.1",
                timestamp: "2024-04-02T14:21:00Z"
            },
            {
                id: 3,
                deviceId: "PC-3309",
                action: "Installed",
                version: "25.0",
                timestamp: "2024-01-14T08:40:00Z"
            },
            {
                id: 4,
                deviceId: "MAC-8821",
                action: "Installed",
                version: "25.0",
                timestamp: "2024-01-18T16:05:00Z"
            },
            {
                id: 5,
                deviceId: "LPT-2211",
                action: "Reinstalled",
                version: "25.1",
                timestamp: "2024-06-10T11:50:00Z"
            }
        ];

        // --------- DUMMY SOFTWARE DETAILS ---------
        const dummySoftware = {
            id: softwareId,
            productName: "Adobe Photoshop",
            vendor: "Adobe",
            category: "Design",
            description: "Industry-standard digital imaging software.",
            sku: "ADBE-PS-2024",
            status: "Active",
            createdAt: "2023-05-12T10:30:00Z",
        };

        // --------- DUMMY LICENSE DATA ---------
        const dummyLicenses = [
            {
                id: 1,
                licenseType: "PerUser",
                totalEntitlements: 50,
                cost: 1200,
                currency: "USD",
                expiryDate: "2025-12-31",
                vendorContract: {
                    contractNumber: "CNT-99881",
                    price: 1200,
                    expiryDate: "2025-12-31",
                },
            },
        ];

        // --------- DUMMY INSTALLED SOFTWARE ---------
        const dummyInstallations = [
            { id: 1, deviceId: "LPT-2211", version: "25.0", installDate: "2024-01-11" },
            { id: 2, deviceId: "PC-3309", version: "25.0", installDate: "2024-01-14" },
            { id: 3, deviceId: "MAC-8821", version: "25.0", installDate: "2024-01-18" },
        ];

        // --------- DUMMY ENTITLEMENTS ---------
        const dummyEntitlements = [
            { id: 1, user: "John Doe", device: null, assignedAt: "2024-02-01" },
            { id: 2, user: "Alice Johnson", device: null, assignedAt: "2024-02-05" },
            { id: 3, user: null, device: "PC-3309", assignedAt: "2024-02-10" },
        ];

        setDetails(dummySoftware);
        setLicenses(dummyLicenses);
        setInstallations(dummyInstallations);
        setEntitlements(dummyEntitlements);
        setInstallHistory(dummyInstallHistory);

    }, [softwareId]);

    if (!details) return <p>Loading...</p>;

    return (
        <section className="details-root">
            {/* ================== HEADER ================== */}
            <header className="details-header">
                <h2>{details.productName}</h2>
                <p className="subtitle">{details.vendor} • {details.category}</p>
                <span className={`status-pill ${details.status.toLowerCase()}`}>{details.status}</span>
            </header>

            {/* ================== OVERVIEW CARD ================== */}
            <div className="info-card">
                <h3>Product Overview</h3>
                <p>{details.description}</p>
                <p><strong>SKU:</strong> {details.sku}</p>
                <p><strong>Created At:</strong> {new Date(details.createdAt).toLocaleDateString()}</p>
            </div>

            {/* ================== LICENSE SECTION ================== */}
            <section className="section-block">
                <h3>Licenses</h3>

                <div className="stats-row">
                    <div className="stat-box">
                        <h4>Total Licenses Purchased</h4>
                        <p>{licenses.reduce((sum, x) => sum + x.totalEntitlements, 0)}</p>
                    </div>

                    <div className="stat-box">
                        <h4>Seats Assigned</h4>
                        <p>{entitlements.length}</p>
                    </div>

                    <div className="stat-box">
                        <h4>Contracts</h4>
                        <p>{licenses.length}</p>
                    </div>

                    <div className="stat-box warning">
                        <h4>Expiry Alerts</h4>
                        <p>{licenses.filter(x => new Date(x.expiryDate) < new Date("2025-06-01")).length}</p>
                    </div>
                </div>

                <table className="details-table">
                    <thead>
                        <tr>
                            <th>License Type</th>
                            <th>Total Entitlements</th>
                            <th>Cost</th>
                            <th>Expiry</th>
                            <th>Contract #</th>
                        </tr>
                    </thead>
                    <tbody>
                        {licenses.map(lic => (
                            <tr key={lic.id}>
                                <td>{lic.licenseType}</td>
                                <td>{lic.totalEntitlements}</td>
                                <td>{lic.currency} {lic.cost}</td>
                                <td>{lic.expiryDate}</td>
                                <td>{lic.vendorContract?.contractNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* ================== INSTALLED SOFTWARE ================== */}
            <section className="section-block">
                <h3>Installed Software</h3>
                <p className="highlight">Installed on {installations.length} devices</p>
                <table className="details-table">
                    <thead>
                        <tr>
                            <th>Device ID</th>
                            <th>Version</th>
                            <th>Install Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {installations.map(ins => (
                            <tr key={ins.id}>
                                <td>{ins.deviceId}</td>
                                <td>{ins.version}</td>
                                <td>{new Date(ins.installDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>


            <section className="section-block">
                <h3>Installation History</h3>
                <p className="highlight">{installHistory.length} total events recorded</p>

                <table className="details-table">
                    <thead>
                        <tr>
                            <th>Device ID</th>
                            <th>Action</th>
                            <th>Version</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {installHistory.map(evt => (
                            <tr key={evt.id}>
                                <td>{evt.deviceId}</td>
                                <td>{evt.action}</td>
                                <td>{evt.version}</td>
                                <td>{new Date(evt.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            {/* ================== ENTITLEMENTS ================== */}
            <section className="section-block">
                <h3>Entitlements</h3>
                <p className="highlight">{entitlements.length} seats assigned</p>
                <table className="details-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Device</th>
                            <th>Assigned At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entitlements.map(ent => (
                            <tr key={ent.id}>
                                <td>{ent.user || "-"}</td>
                                <td>{ent.device || "-"}</td>
                                <td>{new Date(ent.assignedAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </section>
    );
}
