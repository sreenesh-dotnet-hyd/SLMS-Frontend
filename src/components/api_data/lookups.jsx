// src/api/lookups.js

const users = [
  {
    id: 1,
    userId: "alice@corp",
    displayName: "Alice",
    department: "IT",
    location: "Hyderabad"
  },
  {
    id: 2,
    userId: "bob@corp",
    displayName: "Bob",
    department: "Finance",
    location: "Hyderabad"
  }
];

const devices = [
  {
    id: 1,
    deviceId: "DEV01",
    hostname: "DEV-LAPTOP-01",
    department: "IT",
    location: "Hyderabad"
  },
  {
    id: 2,
    deviceId: "QA01",
    hostname: "QA-DESKTOP-01",
    department: "QA",
    location: "Hyderabad"
  }
];

export const getUsers = () =>
  new Promise(resolve =>
    setTimeout(() => resolve(users), 200)
  );

export const getDevices = () =>
  new Promise(resolve =>
    setTimeout(() => resolve(devices), 200)
  );
