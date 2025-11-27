import React, { useState } from "react";
import "./InstalledSoftwareList.css";
import InstalledSoftwareCRUD from "./InstalledSoftwareCRUD";
export default function InstalledSoftwaresInADevice({ device }) {
  const [openRow, setOpenRow] = useState(null);

  if (!device)
    return <div className="isl-empty">Select a device to view installed software.</div>;

  const software = device.installedSoftware || [];

  const toggleRow = (index) =>
    setOpenRow(openRow === index ? null : index);

  return (
    <div className="isl-container">
      <h2 className="isl-title">
        Installed Software ({software.length})
      </h2>

      {software.length === 0 ? (
        <div className="isl-empty">No software installed on this device.</div>
      ) : (
        <table className="isl-table">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Version</th>
              <th>Vendor</th>
              <th>Installed On</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {software.map((s, i) => (
              <>
                <tr key={i}>
                  <td>
                    <button
                      className="isl-expand-btn"
                      onClick={() => toggleRow(i)}
                    >
                      {openRow === i ? "−" : "+"}
                    </button>
                  </td>

                  <td>{s.productName}</td>
                  <td>{s.version || "-"}</td>
                  <td>{s.vendor || "-"}</td>
                  <td>{new Date(s.installDate).toLocaleDateString()}</td>

                  <td>
                    <span className={`isl-status ${s.status?.toLowerCase()}`}>
                      {s.status || "Active"}
                    </span>
                  </td>
                </tr>

                {/* Installation History Row */}
                {openRow === i && (
                  <tr className="isl-history-row">
                    <td colSpan="6">
                      <div className="isl-history-box">
                        <h4>Installation History</h4>

                        {s.history && s.history.length > 0 ? (
                          <table className="isl-history-table">
                            <thead>
                              <tr>
                                <th>Action</th>
                                <th>Performed By</th>
                                <th>Notes</th>
                                <th>Timestamp</th>
                              </tr>
                            </thead>
                            <tbody>
                              {s.history.map((h, idx) => (
                                <tr key={idx}>
                                  <td>{h.action}</td>
                                  <td>{h.performedBy}</td>
                                  <td>{h.notes || "-"}</td>
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
              </>
            ))}
    
          </tbody>
        </table>
      )}
      <div style={{ marginTop: "30px" }}>
        <InstalledSoftwareCRUD device={device} />
      </div>
    </div>
  );
}
