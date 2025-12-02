import React, { useEffect, useState } from "react";
import "./InstalledSoftwareList.css";
import InstalledSoftwareCRUD from "./InstalledSoftwareCRUD";
import { useParams } from "react-router-dom";

// export default function InstalledSoftwaresInADevice({ device }) {
//   const [openRow, setOpenRow] = useState(null);
//  const [activeComponent, setActiveComponent] = useState("add");
//   if (!device)
//     return <div className="isl-empty">Select a device to view installed software.</div>;

//   const software = device.installedSoftware || [];

//   const toggleRow = (index) =>
//     setOpenRow(openRow === index ? null : index);

//   return (
//     <div className="isl-container">
//       <div className="isl-header">
//       <h2 className="isl-title">
//         Installed Software ({software.length})
//       </h2>
//         <div className="header-btns">
//           <button
//             onClick={() => setActiveComponent("display")}
//             className={activeComponent === "display" ? "active" : ""}
//           >
//             Display
//           </button>
//           <button
//             onClick={() => setActiveComponent("add")}
//             className={activeComponent === "add" ? "active" : ""}
//           >
//             Add
//           </button>

//           <button
//             onClick={() => setActiveComponent("update")}
//             className={activeComponent === "update" ? "active" : ""}
//           >
//             Update
//           </button>

//           <button
//             onClick={() => setActiveComponent("delete")}
//             className={activeComponent === "delete" ? "active" : ""}
//           >
//             Delete
//           </button>
//         </div>
//       </div>

//       {software.length === 0 ? (
//         <div className="isl-empty">No software installed on this device.</div>
//       ) : (
//         <table className="isl-table">
//           <thead>
//             <tr>

//               <th>Product</th>
//               <th>Version</th>
//               <th>Vendor</th>
//               <th>Installed On</th>
//               <th>Status</th>
//                <th>History</th>
//             </tr>
//           </thead>

//           <tbody>
//             {software.map((s, i) => (
//               <>
//                 <tr key={i}>


//                   <td>{s.productName}</td>
//                   <td>{s.version || "-"}</td>
//                   <td>{s.vendor || "-"}</td>
//                   <td>{new Date(s.installDate).toLocaleDateString()}</td>

//                   <td>
//                     <span className={`isl-status ${s.status?.toLowerCase()}`}>
//                       {s.status || "Active"}
//                     </span>
//                   </td>
//                    <td>
//                     <button
//                       className="isl-expand-btn"
//                       onClick={() => toggleRow(i)}
//                     >
//                       {openRow === i ? "Close" : "View History"}
//                     </button>
//                   </td>
//                 </tr>

//                 {/* Installation History Row */}
//                 {openRow === i && (
//                   <tr className="isl-history-row">
//                     <td colSpan="6">
//                       <div className="isl-history-box">
//                         <h4>Installation History</h4>

//                         {s.history && s.history.length > 0 ? (
//                           <table className="isl-history-table">
//                             <thead>
//                               <tr>
//                                 <th>Action</th>
//                                 <th>Performed By</th>
//                                 <th>Notes</th>
//                                 <th>Timestamp</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {s.history.map((h, idx) => (
//                                 <tr key={idx}>
//                                   <td>{h.action}</td>
//                                   <td>{h.performedBy}</td>
//                                   <td>{h.notes || "-"}</td>
//                                   <td>{new Date(h.timestamp).toLocaleString()}</td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         ) : (
//                           <p className="isl-empty">No history available.</p>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </>
//             ))}

//           </tbody>
//         </table>
//       )}
//       {/* <div style={{ marginTop: "30px" }}>
//         <InstalledSoftwareCRUD device={device} />
//       </div> */}
//     </div>
//   );
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
  }, [])

useEffect(() => {
  if (Installations.length === 0) return;

  const unique = Object.values(
    Installations.reduce((acc, item) => {
      const key = item.installedSoftwareId;

      if (
        !acc[key] ||
        new Date(item.installDate) < new Date(acc[key].installDate)
      ) {
        acc[key] = item;
      }

      return acc;
    }, {})
  );

  setUniqueInstallations(unique);
  console.log("Unique oldest:", unique);
}, [Installations]);


  const uniqueOldest = Object.values(
    Installations.reduce((acc, item) => {
      const key = item.installedSoftwareId;

      // If not added yet OR found an older date → keep it
      if (!acc[key] || new Date(item.installDate) < new Date(acc[key].installDate)) {
        acc[key] = item;
      }

   
      return acc;
    }, {})
  );


  const loadAllHistory = async (installs) => {

    const results = await Promise.all(
      installs.map(async (item) => {
        const res = await fetch(
          `https://localhost:7153/inventory/history/${item.installedSoftwareId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          }
        );

        const history = await res.json();

        return { id: item.id, history };
      })
    );

    // Convert list → dictionary for fast UI lookup
    const historyDict = {};
    results.forEach(r => {
      historyDict[r.id] = r.history;
    });

    setHistoryMap(historyDict);

    console.log("history:", historyDict);
  };

  const loadInstallations = async () => {
    try {

      const res = await fetch("https://localhost:7153/inventory/installations/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`  // <-- JWT goes here
        }
      });
      var data = await res.json();
      console.log(data);
      console.log(deviceId, typeof (deviceId));
      var data = data.filter(item => item.deviceId === Number(deviceId));

      console.log(data);
      setInstallations(data);
      loadAllHistory(data);
    } catch (err) {
      console.error(err);
    }

  }



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

      {/* ------------------------------------
          CONDITIONAL RENDERING STARTS HERE
         ------------------------------------ */}

      {activeComponent === "display" && (
        <>
          {software.length === 0 ? (
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
                  {/* {software.map((s, i) => (
                    <>
                      <tr key={i}>
                        <td>{s.productName}</td>
                        <td>{s.version || "-"}</td>
                        <td>{s.vendor || "-"}</td>
                        <td>{new Date(s.installDate).toLocaleDateString()}</td>
                        <td>
                          <span className={`isl-status ${s.status?.toLowerCase()}`}>
                            {s.status || "Active"}
                          </span>
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
            </div>
          )}
        </>
      )} */}


                  {/* API DATA */}

                  {uniqueInstallations.map((s, i) => (
                    <>
                      <tr key={i}>
                        <td>{s.productName}</td>
                        <td>{s.version || "-"}</td>
                        <td>{s.vendor || "-"}</td>
                        <td>{new Date(s.installDate).toLocaleDateString()}</td>
                        <td>
                          {/* <span className={`isl-status ${s.status?.toLowerCase()}`}>
                            {s.status || "Active"}
                          </span> */}

                          {
                            (() => {
                              const history = historyMap[s.id] || [];

                              // get most recent history entry
                              const latest = history.length > 0
                                ? history.reduce((a, b) => (
                                  new Date(a.timestamp) > new Date(b.timestamp) ? a : b
                                ))
                                : null;

                              // determine status
                              const status = latest?.action?.toLowerCase() === "uninstall"
                                ? "Retired"
                                : "Active";

                              return (
                                <span className={`isl-status ${status.toLowerCase()}`}>
                                  {status}
                                </span>
                              );
                            })()
                          }
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

                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}



      {/* CRUD forms */}
      {(activeComponent === "add" ||
        activeComponent === "update" ||
        activeComponent === "delete") && (
          <InstalledSoftwareCRUD
            device={device}
            mode={activeComponent}   // pass mode
          />
        )}
    </div>
  );
}
