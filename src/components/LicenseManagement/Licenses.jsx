// src/api/licenses.js

// ---- DUMMY DATA ----
const licenses = [
  {
    id: 1,
    productName: "Microsoft Office 365",
    vendor: "Microsoft",
    sku: "O365-E3",
    licenseType: "PerUser",
    totalEntitlements: 50,
    cost: 5000,
    currency: "USD",
    purchaseDate: "2024-01-10T00:00:00Z",
    expiryDate: "2025-01-09T00:00:00Z",
    notes: "E3 plan company-wide",
    vendorContract: {
      id: 1,
      licenseId: 1,
      vendorName: "Microsoft",
      contractNumber: "MS-2024-001",
      purchaseDate: "2024-01-10T00:00:00Z",
      expiryDate: "2025-01-09T00:00:00Z",
      terms: "Annual, auto-renew",
      price: 5000
    }
  },
  {
    id: 2,
    productName: "Visual Studio",
    vendor: "Microsoft",
    sku: "VS-2022",
    licenseType: "PerDevice",
    totalEntitlements: 10,
    cost: 2000,
    currency: "USD",
    purchaseDate: "2023-06-01T00:00:00Z",
    expiryDate: "2026-06-01T00:00:00Z",
    notes: "For dev team only",
    vendorContract: null
  }
];

// Entitlements + installations are shared with other mocks
const entitlements = [
  {
    id: 1,
    licenseId: 1,
    userId: 1,
    deviceId: null,
    assignedAt: "2024-02-01T00:00:00Z",
    expiresAt: "2025-01-09T00:00:00Z",
    user: { id: 1, displayName: "Alice", userId: "alice@corp" },
    device: null
  },
  {
    id: 2,
    licenseId: 1,
    userId: 2,
    deviceId: null,
    assignedAt: "2024-03-01T00:00:00Z",
    expiresAt: null,
    user: { id: 2, displayName: "Bob", userId: "bob@corp" },
    device: null
  },
  {
    id: 3,
    licenseId: 2,
    userId: null,
    deviceId: 1,
    assignedAt: "2024-04-01T00:00:00Z",
    expiresAt: null,
    user: null,
    device: { id: 1, hostname: "DEV-LAPTOP-01", deviceId: "DEV01" }
  }
];

const installations = [
  {
    id: 1,
    deviceId: 1,
    productName: "Microsoft Office 365",
    version: "2402",
    installDate: "2024-02-10T00:00:00Z",
    licenseId: 1,
    device: { id: 1, hostname: "DEV-LAPTOP-01", deviceId: "DEV01" },
    license: licenses[0]
  },
  {
    id: 2,
    deviceId: 2,
    productName: "Visual Studio",
    version: "17.10",
    installDate: "2024-02-15T00:00:00Z",
    licenseId: 2,
    device: { id: 2, hostname: "QA-DESKTOP-01", deviceId: "QA01" },
    license: licenses[1]
  }
];

// ---- API-LIKE FUNCTIONS (PROMISES) ----
export const getLicenses = () =>
  new Promise(resolve => setTimeout(() => resolve(licenses), 200));

export const getLicenseById = id =>
  new Promise(resolve =>
    setTimeout(
      () => resolve(licenses.find(l => l.id === Number(id))),
      200
    )
  );

// For list page seat usage (we want entitlements length)
export const getLicenseEntitlements = licenseId =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve(
          entitlements.filter(e => e.licenseId === Number(licenseId))
        ),
      200
    )
  );

export const getLicenseInstallations = licenseId =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve(
          installations.filter(i => i.licenseId === Number(licenseId))
        ),
      200
    )
  );

// We won’t actually create/update – just resolve success
export const createLicense = payload =>
  new Promise(resolve => {
    const newItem = {
      ...payload,
      id: licenses.length + 1,
      vendorContract: null
    };
    licenses.push(newItem);
    setTimeout(() => resolve(newItem), 200);
  });

export const updateLicense = (id, payload) =>
  new Promise(resolve => {
    const idx = licenses.findIndex(l => l.id === Number(id));
    if (idx !== -1) {
      licenses[idx] = { ...licenses[idx], ...payload };
    }
    setTimeout(() => resolve(licenses[idx]), 200);
  });

// export these so other mock files can import if needed
export { entitlements as _mockEntitlements, installations as _mockInstallations };
