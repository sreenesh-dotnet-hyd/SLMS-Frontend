// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import SoftwareList from './components/SoftwareCatalog/SoftwareList'
// import SoftwareCRUD from './components/SoftwareCatalog/SoftwareCRUD'
// import SoftwareDetails from './components/SoftwareCatalog/SoftwareDetails'
// import DeviceList from './components/DeviceInventoryManagement/DeviceList'
// import DeviceDetails from './components/DeviceInventoryManagement/DeviceDetails'
// import DeviceCRUD from './components/DeviceInventoryManagement/DeviceCRUD'
// import InstalledSoftwaresInADevice from './components/DeviceInventoryManagement/InstalledSoftwaresInADevice'
// import UserList from './components/UserManagementSystem/UsersList'
// import UserProfile from './components/UserManagementSystem/UserProfile'
// import UserDevices from './components/UserManagementSystem/UserDevices'
// import AssignedLicenses from './components/UserManagementSystem/AssignedLicenses'
// import LicenseList from './components/LicenseManagement/LicenseList'

// function App() {
//   const [count, setCount] = useState(0)

// // for deviceList component, send this as a prop
// const dummyDeviceDeviceList = {
//   id: 1,
//   deviceId: "LPT-5521",
//   hostname: "Sree-Laptop",
//   department: "Engineering",
//   location: "Hyderabad",
//   lastSeen: "2025-01-18T14:32:00Z",

//   ownerUser: {
//     id: 101,
//     userId: "EMP1022",
//     displayName: "Sree Nesh",
//     department: "Engineering",
//     location: "Hyderabad",
//   },

//   installedSoftware: [
//     {
//       id: 1,
//       productName: "Adobe Photoshop",
//       version: "25.0",
//       installDate: "2024-11-02T09:30:00Z",
//     },
//     {
//       id: 2,
//       productName: "Visual Studio Code",
//       version: "1.92",
//       installDate: "2024-12-12T11:10:00Z",
//     },
//     {
//       id: 3,
//       productName: "Postman",
//       version: "10.22",
//       installDate: "2024-10-21T13:00:00Z",
//     },
//   ],
// };

// const dummyDeviceInstalledSoftware = {
//   deviceId: "LTP-99221",
//   hostname: "Sree-PC",
//   department: "IT",
//   location: "Hyderabad",
//   lastSeen: "2025-01-18T12:00:00Z",

//   installedSoftware: [
//     {
//       productName: "Adobe Photoshop",
//       vendor: "Adobe",
//       version: "25.0",
//       status: "Active",
//       installDate: "2024-09-10T09:20:00Z",
//       history: [
//         {
//           action: "Installed",
//           performedBy: "admin@company.com",
//           notes: "Initial deployment",
//           timestamp: "2024-09-10T09:20:00Z",
//         },
//         {
//           action: "Updated",
//           performedBy: "admin@company.com",
//           notes: "Patched to latest version",
//           timestamp: "2024-12-01T10:10:00Z",
//         },
//       ],
//     },
//     {
//       productName: "VS Code",
//       vendor: "Microsoft",
//       version: "1.92",
//       status: "Active",
//       installDate: "2024-11-22T14:00:00Z",
//       history: [
//         {
//           action: "Installed",
//           performedBy: "it-support@company.com",
//           timestamp: "2024-11-22T14:00:00Z",
//         },
//       ],
//     },
//     {
//       productName: "Oracle SQL Developer",
//       vendor: "Oracle",
//       version: "23.2",
//       status: "Retired",
//       installDate: "2023-05-01T10:00:00Z",
//       history: [],
//     },
//   ],
// };
//   const currentRole = "ITAdmin";

//   return (
//     <>
//     {/* <DeviceList/>
//     <DeviceCRUD/>
//     <InstalledSoftwaresInADevice device={dummyDeviceInstalledSoftware}/> */}

//     {/* <UserProfile user={{ id: 1, userId: "EMP1001", displayName: "Alice Johnson", department: "Finance" }}/>
//     <UserList/>
//     <AssignedLicenses/>
//     <UserDevices user={{ id: 1, userId: "EMP1001", displayName: "Alice Johnson", department: "Finance" }}/>
//     */}
//   <LicenseList role={currentRole}/>
//     </>
//   )
// }

// export default App

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import DeviceList from "./components/DeviceInventoryManagement/DeviceList";
import DeviceCRUD from "./components/DeviceInventoryManagement/DeviceCRUD";
import InstalledSoftwaresInADevice from "./components/DeviceInventoryManagement/InstalledSoftwaresInADevice";
import SoftwareList from "./components/SoftwareCatalog/SoftwareList";
import SoftwareCRUD from "./components/SoftwareCatalog/SoftwareCRUD";
import SoftwareDetails from "./components/SoftwareCatalog/SoftwareDetails";

import UserDevices from "./components/UserManagementSystem/UserDevices";
import UserProfile from "./components/UserManagementSystem/UserProfile";
import UsersList from "./components/UserManagementSystem/UsersList";

import Features from "./components/LandingPage/Features";
import Company from "./components/LandingPage/Company";
import Resources from "./components/LandingPage/Resources";
import Pricing from "./components/LandingPage/Pricing";

//NITHIN COMPONENETS
import LicensesListPage from "./components/LicenseManagement/LicenseListPage";
import LicenseFormPage from "./components/LicenseManagement/LicenseFormPage";
import LicenseDetailsPage from "./components/LicenseManagement/LicenseDetailsPage";

import EntitlementListPage from "./components/EntitlementsManagement/EntitlementListPage";
import AssignEntitlementPage from "./components/EntitlementsManagement/AssignEntitlementPage";

import InstalledSoftwareListPage from "./components/InstallationTrackingHistory/InstalledSoftwareListPage";
import DeviceInstallationsPage from "./components/InstallationTrackingHistory/DeviceInstallationsPage";
import InstallationHistoryPage from "./components/InstallationTrackingHistory/InstallationHistoryPage";

import RenewalDashboard from "./components/RenewalDashboard/RenewalDashboard";
import Home from "./components/LandingPage/Home";
import Auth from "./components/SignInPage/Auth";
import ItAdminDashboard from "./components/Dashboards/ItAdminDashboard";
import FinanceDashboard from "./components/Dashboards/FinanceDashboard";
import UserDashboard from "./components/Dashboards/UserDashboard";
import AuditorDashboard from "./components/Dashboards/AuditorDashboard";
import Contact from "./components/LandingPage/Contact";

function App() {
  const currentRole = "ITAdmin";

  const dummyDeviceInstalledSoftware = {
    deviceId: "LTP-99221",
    hostname: "Sree-PC",
    department: "IT",
    location: "Hyderabad",
    lastSeen: "2025-01-18T12:00:00Z",
    installedSoftware: [
      {
        productName: "Adobe Photoshop",
        vendor: "Adobe",
        version: "25.0",
        status: "Active",
        installDate: "2024-09-10T09:20:00Z",
        history: [
          {
            action: "Installed",
            performedBy: "admin@company.com",
            notes: "Initial deployment",
            timestamp: "2024-09-10T09:20:00Z",
          },
          {
            action: "Updated",
            performedBy: "admin@company.com",
            notes: "Patched to latest version",
            timestamp: "2024-12-01T10:10:00Z",
          },
        ],
      },
      {
        productName: "VS Code",
        vendor: "Microsoft",
        version: "1.92",
        status: "Active",
        installDate: "2024-11-22T14:00:00Z",
        history: [
          {
            action: "Installed",
            performedBy: "it-support@company.com",
            timestamp: "2024-11-22T14:00:00Z",
          },
        ],
      },
      {
        productName: "Oracle SQL Developer",
        vendor: "Oracle",
        version: "23.2",
        status: "Retired",
        installDate: "2023-05-01T10:00:00Z",
        history: [],
      },
    ],
  };

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
          <Route path="/company" element={<Company />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />

          {/* Main layout with sidebar and navbar */}
          <Route path="/app" element={<Layout />}>
            {/* Redirect default to Device Inventory */}
            <Route index element={<Navigate to="device-list" replace />} />

            {/* Device Inventory routes */}

            <Route path="devices" element={<DeviceList />} />
            <Route path="devices/management" element={<DeviceCRUD />} />
            <Route
              path="devices/:deviceId/installed"
              element={
                <InstalledSoftwaresInADevice
                  device={dummyDeviceInstalledSoftware}
                />
              }
            />

            {/* Software Catalog routes */}
            <Route path="software-catalog" element={<SoftwareList />} />
            <Route
              path="software-catalog/software-management"
              element={<SoftwareCRUD />}
            />
            <Route
              path="software-catalog/software-details"
              element={<SoftwareDetails />}
            />

            <Route
              path="users-devices"
              element={
                <UserDevices
                  user={{
                    id: 1,
                    userId: "EMP1001",
                    displayName: "Alice Johnson",
                    department: "Finance",
                  }}
                />
              }
            />
            <Route
              path="user-profile"
              element={
                <UserProfile
                  user={{
                    id: 1,
                    userId: "EMP1001",
                    displayName: "Alice Johnson",
                    department: "Finance",
                  }}
                />
              }
            />
            <Route path="users-list" element={<UsersList />} />

            {/* Licenses */}
            <Route
              path="licenses"
              element={<LicensesListPage role={currentRole} />}
            />
            <Route path="licenses/new" element={<LicenseFormPage />} />
            <Route path="licenses/:id/edit" element={<LicenseFormPage />} />
            <Route
              path="licenses/:id"
              element={<LicenseDetailsPage role={currentRole} />}
            />

            {/* Entitlements */}
            <Route path="entitlements" element={<EntitlementListPage />} />
            <Route
              path="entitlements/assign"
              element={<AssignEntitlementPage />}
            />

            {/* Installations */}
            <Route path="installed" element={<InstalledSoftwareListPage />} />
            <Route
              path="devices/:deviceId/installed"
              element={<DeviceInstallationsPage />}
            />
            <Route
              path="installed/:id/history"
              element={<InstallationHistoryPage />}
            />

            {/* Dashboard */}
            <Route path="dashboard/renewals" element={<RenewalDashboard />} />
            <Route path="dashboards/" element={<ItAdminDashboard />} />
            <Route
              path="dashboards/finance-dashboard"
              element={<FinanceDashboard />}
            />
            <Route
              path="dashboards/user-dashboard"
              element={<UserDashboard />}
            />
            <Route
              path="dashboards/auditor-dashboard"
              element={<AuditorDashboard />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
