import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SoftwareList from './components/SoftwareCatalog/SoftwareList'
import SoftwareCRUD from './components/SoftwareCatalog/SoftwareCRUD'
import SoftwareDetails from './components/SoftwareCatalog/SoftwareDetails'
import DeviceList from './components/DeviceInventoryManagement/DeviceList'
import DeviceDetails from './components/DeviceInventoryManagement/DeviceDetails'
import DeviceCRUD from './components/DeviceInventoryManagement/DeviceCRUD'
import InstalledSoftwaresInADevice from './components/DeviceInventoryManagement/InstalledSoftwaresInADevice'
import UserList from './components/UserManagementSystem/UsersList'
import UserProfile from './components/UserManagementSystem/UserProfile'
import UserDevices from './components/UserManagementSystem/UserDevices'
import AssignedLicenses from './components/UserManagementSystem/AssignedLicenses'



function App() {
  const [count, setCount] = useState(0)


// for deviceList component, send this as a prop
const dummyDeviceDeviceList = {
  id: 1,
  deviceId: "LPT-5521",
  hostname: "Sree-Laptop",
  department: "Engineering",
  location: "Hyderabad",
  lastSeen: "2025-01-18T14:32:00Z",

  ownerUser: {
    id: 101,
    userId: "EMP1022",
    displayName: "Sree Nesh",
    department: "Engineering",
    location: "Hyderabad",
  },

  installedSoftware: [
    {
      id: 1,
      productName: "Adobe Photoshop",
      version: "25.0",
      installDate: "2024-11-02T09:30:00Z",
    },
    {
      id: 2,
      productName: "Visual Studio Code",
      version: "1.92",
      installDate: "2024-12-12T11:10:00Z",
    },
    {
      id: 3,
      productName: "Postman",
      version: "10.22",
      installDate: "2024-10-21T13:00:00Z",
    },
  ],
};


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
    <>
    {/* <DeviceList/>
    <DeviceCRUD/> 
    <InstalledSoftwaresInADevice device={dummyDeviceInstalledSoftware}/> */}

    {/* <UserProfile user={{ id: 1, userId: "EMP1001", displayName: "Alice Johnson", department: "Finance" }}/>
    <UserList/>
    <AssignedLicenses/>
    <UserDevices user={{ id: 1, userId: "EMP1001", displayName: "Alice Johnson", department: "Finance" }}/>
    */}
    
    </>
  )
}

export default App



// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Layout from './components/Layout/Layout';
// import DeviceList from './components/DeviceInventoryManagement/DeviceList';
// import DeviceCRUD from './components/DeviceInventoryManagement/DeviceCRUD';
// import InstalledSoftwaresInADevice from './components/DeviceInventoryManagement/InstalledSoftwaresInADevice';
// import SoftwareList from './components/SoftwareCatalog/SoftwareList';
// import SoftwareCRUD from './components/SoftwareCatalog/SoftwareCRUD';
// import SoftwareDetails from './components/SoftwareCatalog/SoftwareDetails';

// function App() {
//   const dummyDeviceInstalledSoftware = {
//     deviceId: "LTP-99221",
//     hostname: "Sree-PC",
//     department: "IT",
//     location: "Hyderabad",
//     lastSeen: "2025-01-18T12:00:00Z",
//     installedSoftware: [
//       {
//         productName: "Adobe Photoshop",
//         vendor: "Adobe",
//         version: "25.0",
//         status: "Active",
//         installDate: "2024-09-10T09:20:00Z",
//         history: [
//           { action: "Installed", performedBy: "admin@company.com", notes: "Initial deployment", timestamp: "2024-09-10T09:20:00Z" },
//           { action: "Updated", performedBy: "admin@company.com", notes: "Patched to latest version", timestamp: "2024-12-01T10:10:00Z" },
//         ],
//       },
//       { productName: "VS Code", vendor: "Microsoft", version: "1.92", status: "Active", installDate: "2024-11-22T14:00:00Z", history: [{ action: "Installed", performedBy: "it-support@company.com", timestamp: "2024-11-22T14:00:00Z" }] },
//       { productName: "Oracle SQL Developer", vendor: "Oracle", version: "23.2", status: "Retired", installDate: "2023-05-01T10:00:00Z", history: [] },
//     ],
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Main layout with sidebar and navbar */}
//         <Route path="/" element={<Layout />}>
//           {/* Redirect default to Device Inventory */}
//           <Route index element={<Navigate to="device-list" replace />} />

//           {/* Device Inventory routes */}
//           <Route path="device-list" element={<DeviceList />} />
//           <Route path="device-crud" element={<DeviceCRUD />} />
//           <Route path="installed-softwares" element={<InstalledSoftwaresInADevice device={dummyDeviceInstalledSoftware} />} />

//           {/* Software Catalog routes */}
//           <Route path="software-list" element={<SoftwareList />} />
//           <Route path="software-crud" element={<SoftwareCRUD />} />
//           <Route path="software-details" element={<SoftwareDetails />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
