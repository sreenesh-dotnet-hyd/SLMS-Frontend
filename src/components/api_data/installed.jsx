// src/api/installed.js
import { _mockInstallations } from "./licenses";

const installed = _mockInstallations;

const histories = [
  {
    id: 1,
    installedSoftwareId: 1,
    action: "Installed",
    performedBy: "system",
    notes: "Initial deployment",
    timestamp: "2024-02-10T10:00:00Z"
  },
  {
    id: 2,
    installedSoftwareId: 1,
    action: "Updated",
    performedBy: "alice@corp",
    notes: "Updated to version 2402",
    timestamp: "2024-04-01T09:15:00Z"
  },
  {
    id: 3,
    installedSoftwareId: 2,
    action: "Installed",
    performedBy: "bob@corp",
    notes: "",
    timestamp: "2024-02-15T14:00:00Z"
  }
];

export const getInstalled = (params = {}) =>
  new Promise(resolve => {
    let data = installed;
    if (params.deviceId) {
      data = data.filter(i => i.deviceId === Number(params.deviceId));
    }
    setTimeout(() => resolve(data), 200);
  });

export const getInstallationHistory = id =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve(
          histories.filter(h => h.installedSoftwareId === Number(id))
        ),
      200
    )
  );

export const createInstalled = payload =>
  new Promise(resolve => {
    const newItem = {
      ...payload,
      id: installed.length + 1,
      installDate: new Date().toISOString()
    };
    installed.push(newItem);
    setTimeout(() => resolve(newItem), 200);
  });

export const deleteInstalled = id =>
  new Promise(resolve => {
    const idx = installed.findIndex(i => i.id === Number(id));
    if (idx !== -1) installed.splice(idx, 1);
    setTimeout(() => resolve({ success: true }), 200);
  });
