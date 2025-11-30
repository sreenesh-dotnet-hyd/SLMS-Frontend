// src/api/entitlements.js
import { _mockEntitlements } from "./licenses";

const entitlements = _mockEntitlements;

export const getEntitlements = () =>
  new Promise(resolve =>
    setTimeout(() => resolve(entitlements), 200)
  );

export const createEntitlement = payload =>
  new Promise(resolve => {
    const newItem = {
      ...payload,
      id: entitlements.length + 1,
      assignedAt: new Date().toISOString(),
      // Very simple dummy linked objects
      user: payload.userId
        ? { id: payload.userId, displayName: `User ${payload.userId}`, userId: `user${payload.userId}@corp` }
        : null,
      device: payload.deviceId
        ? { id: payload.deviceId, hostname: `DEVICE-${payload.deviceId}`, deviceId: `DEV-${payload.deviceId}` }
        : null
    };
    entitlements.push(newItem);
    setTimeout(() => resolve(newItem), 200);
  });

export const deleteEntitlement = id =>
  new Promise(resolve => {
    const idx = entitlements.findIndex(e => e.id === Number(id));
    if (idx !== -1) entitlements.splice(idx, 1);
    setTimeout(() => resolve({ success: true }), 200);
  });
