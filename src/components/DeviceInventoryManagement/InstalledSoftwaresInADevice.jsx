import React, { useEffect, useState } from "react";
import "./InstalledSoftwareList.css";
import InstalledSoftwareCRUD from "./InstalledSoftwareCRUD";
import { useParams } from "react-router-dom";

// KEEP EVERYTHING COMMENTED AS YOU REQUESTED

// export default function InstalledSoftwaresInADevice({ device }) {
//   ...
// }

export default function InstalledSoftwaresInADevice({ device }) {
  const { deviceId } = useParams();
  console.log("Device ID from route:", deviceId);

  const [openRow, setOpenRow] = useState(null);
  const [activeComponent, setActiveComponent] = useState("display");
  const [historyMap, setHistoryMap] = useState({});
  const [Installations, setInstallations] = useState([]);
  const [uniqueInstallations, setUniqueInstallations] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadInstallations();
  }, []);

  useEffect(() => {
    if (Installations.length === 0) return;

    const unique = Object.values(
      Installations.reduce((acc, item) => {
        const key = item.id; // FIX: MUST USE id

        if (!acc[key] || new Date(item.installDate) < new Date(acc[key].installDate)) {
          acc[key] = item;
        }
        return acc;
      }, {})
    );

    setUniqueInstallations(unique);
    console.log("Unique oldest:", unique);
  }, [Installations]);

  const loadAllHistory = async (installs) => {
    const results = await Promise.all(
      installs.map(async (item) => {
        try {
          const res = await fetch(
            `${BASE_URL}/inventory/installations/history/${item.installedSoftwareId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!res.ok) return { id: item.id, history: [] };

          const history = await res.json();
          return { id: item.id, history };
        } catch {
          return { id: item.id, history: [] };
        }
      })
    );

    const historyDict = {};
    results.forEach((r) => (historyDict[r.id] = r.history));
    setHistoryMap(historyDict);

    console.log("history:", historyDict);
  };


  const loadInstallations = async () => {
    try {
      const res = await fetch("http://localhost:7000/inventory/installations/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      let data = await res.json();
      console.log(data);
      console.log(deviceId, typeof (deviceId));

      data = data.filter(item => item.deviceId === Number(deviceId));
      console.log(data);

      setInstallations(data);
      loadAllHistory(data);

    } catch (err) {
      console.error(err);
    }
  };

  if (!device)
    return <div className="isl-empty">Select a device to view installed software.</div>;

  const software = device.installedSoftware || [];

  const toggleRow = (index) =>
    setOpenRow(openRow === index ? null : index);

  return (
    <div className="isl-container">
      <div className="isl-header">
        <h2 className="isl-title">
          {activeComponent === "display" ? "Installed Software on this device." : null}
          {activeComponent === "add" ? "Add Software on this device." : null}
          {activeComponent === "update" ? "Update Software on this device." : null}
          {activeComponent === "delete" ? "Delete Software on this device." : null}
        </h2>

        <div className="header-btns">
          <button
            onClick={() => setActiveComponent("display")}
            className={activeComponent === "display" ? "active" : ""}
          >
            View
          </button>

          <button
            onClick={() => setActiveComponent("add")}
            className={activeComponent === "add" ? "active" : ""}
          >
            Add
          </button>

          <button
            onClick={() => setActiveComponent("update")}
            className={activeComponent === "update" ? "active" : ""}
          >
            Update
          </button>

          <button
            onClick={() => setActiveComponent("delete")}
            className={activeComponent === "delete" ? "active" : ""}
          >
            Delete
          </button>
        </div>
      </div>

      {/* DISPLAY SECTION */}
      {activeComponent === "display" && (
        <>
          {uniqueInstallations.length === 0 ? (
            <div className="isl-empty">No software installed on this device.</div>
          ) : (
            <div className="isl-table-wrapper">
              <table className="isl-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Version</th>
                    <th>Vendor</th>
                    <th>Installed On</th>
                    <th>Status</th>
                    <th>View More</th>
                  </tr>
                </thead>

                <tbody>
                  {uniqueInstallations.map((s, i) => (
                    <React.Fragment key={s.id}>
                      <tr>
                        <td>{s.productName}</td>
                        <td>{s.version || "-"}</td>
                        <td>{s.vendor || "-"}</td>
                        <td>{new Date(s.installDate).toLocaleDateString()}</td>
                        <td>
                          {(() => {
                            const history = historyMap[s.id] || [];
                            const latest = history.length > 0
                              ? history.reduce((a, b) =>
                                new Date(a.timestamp) > new Date(b.timestamp) ? a : b
                              )
                              : null;

                            const status =
                              latest?.action?.toLowerCase() === "uninstall"
                                ? "Retired"
                                : "Active";

                            return (
                              <span className={`isl-status ${status.toLowerCase()}`}>
                                {status}
                              </span>
                            );
                          })()}
                        </td>

                        <td>
                          <button
                            className="isl-expand-btn"
                            onClick={() => toggleRow(i)}
                          >
                            {openRow === i ? "Close" : "Open"}
                          </button>
                        </td>
                      </tr>

                      {openRow === i && (
                        <tr className="isl-history-row">
                          <td colSpan="6">
                            <div className="isl-history-box">
                              <h4>Installation History</h4>

                              {historyMap[s.id] && historyMap[s.id].length > 0 ? (
                                <table className="isl-history-table">
                                  <thead>
                                    <tr>
                                      <th>Action</th>
                                      <th>Performed By</th>
                                      <th>Timestamp</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {historyMap[s.id].map((h, idx) => (
                                      <tr key={idx}>
                                        <td>{h.action}</td>
                                        <td>{h.performedBy}</td>
                                        <td>{new Date(h.timestamp).toLocaleString()}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              ) : (
                                <p className="isl-empty">No history available.</p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* CRUD FORMS */}
      {(activeComponent === "add" ||
        activeComponent === "update" ||
        activeComponent === "delete") && (
          <InstalledSoftwareCRUD
            device={device}
            mode={activeComponent}
          />
        )}
    </div>
  );
}
