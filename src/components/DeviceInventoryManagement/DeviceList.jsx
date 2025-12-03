import React, { useEffect, useState } from "react";
import "./DeviceList.css";
import { Link } from "react-router-dom";

export default function DeviceList() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadDevices();
  }, []);

  async function loadDevices() {
    try {
      const token = localStorage.getItem("token");
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      console.log(BASE_URL);
      const res = await fetch(`${BASE_URL}/inventory/devices/`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`  // <-- JWT goes here
      }
    });
      const data = await res.json();
      setDevices(data);
      console.log(data);
    } catch (err) {
      console.error("Failed to fetch devices", err);
    }

  }


const dummyData = [
        {
          id: 1,
          deviceId: "LPT-AX1023",
          hostname: "LAPTOP-AX1023",
          ownerUser: { displayName: "Rahul Sharma" },
          department: "Engineering",
          location: "Bangalore",
          lastSeen: "2025-01-10T08:22:00Z",
          installedSoftware: [
            { productName: "VS Code" },
            { productName: "Postman" },
            { productName: "Docker" }
          ]
        },
        {
          id: 2,
          deviceId: "LPT-UX9821",
          hostname: "DEV-UX9821",
          ownerUser: { displayName: "Ananya Rao" },
          department: "Product",
          location: "Hyderabad",
          lastSeen: "2025-01-09T19:12:00Z",
          installedSoftware: [{ productName: "Figma" }]
        },
        {
          id: 3,
          deviceId: "SRV-DB5561",
          hostname: "DB-SERVER-5561",
          ownerUser: null,
          department: "IT Infra",
          location: "Chennai Data Center",
          lastSeen: "2025-01-11T02:40:00Z",
          installedSoftware: [
            { productName: "SQL Server" },
            { productName: "RedGate Tools" }
          ]
        },
        {
          id: 4,
          deviceId: "LPT-HR2910",
          hostname: "HR-LAPTOP-2910",
          ownerUser: { displayName: "Meera N" },
          department: "HR",
          location: "Pune",
          lastSeen: "2025-01-08T11:05:00Z",
          installedSoftware: [
            { productName: "MS Office" },
            { productName: "Adobe Acrobat" }
          ]
        },
        {
          id: 5,
          deviceId: "LPT-FIN1022",
          hostname: "FIN-LAPTOP-1022",
          ownerUser: { displayName: "Vikram S" },
          department: "Finance",
          location: "Mumbai",
          lastSeen: "2025-01-11T09:50:00Z",
          installedSoftware: [
            { productName: "SAP" },
            { productName: "Tally" }
          ]
        },
        {
          id: 6,
          deviceId: "TAB-OPS9991",
          hostname: "OPS-TABLET-9991",
          ownerUser: { displayName: "Operations Team" },
          department: "Operations",
          location: "Delhi",
          lastSeen: "2025-01-10T14:33:00Z",
          installedSoftware: []
        }
      ];

   

  

  const filtered = devices.filter(
    (d) =>
      d.deviceId.toLowerCase().includes(search.toLowerCase()) ||
      d.hostname.toLowerCase().includes(search.toLowerCase()) ||
      d.department.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="device-page">
      <div className="device-header">
        <h1>Device List</h1>

        <input
          className="device-search"
          placeholder="Search by Device ID, Hostname, Department, Location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="device-table-wrapper">
        <table className="device-table">
          <thead>
            <tr>
              <th>Device ID</th>
              <th>Hostname</th>
              <th>Owner</th>
              <th>Department</th>
              <th>Location</th>
              <th>Last Seen</th>
              {/* <th>Installed Software</th> */}
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((d) => (
              <tr key={d.id}>
                <td>{d.deviceId}</td>
                <td>{d.hostname}</td>
                <td>{d.ownerUserId || "-"}</td>
                <td>{d.department}</td>
                <td>{d.location}</td>
                <td>{new Date(d.lastSeen).toLocaleString()}</td>
                {/* <td>
                  <span className="soft-chip">
                    {d.installedSoftware?.length || 0} apps
                  </span>
                </td> */}
                 <td className="text-right">
                    <Link
                      to={`/app/devices/${d.id}/installed`}
                      className="icon-btn"
                      title="Open"
                    >
                      ↗
                    </Link>
                  </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="no-data">
                  No matching devices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
