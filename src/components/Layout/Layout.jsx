import { Outlet, NavLink, useLocation, useParams, matchPath } from 'react-router-dom';
import { Monitor, AppWindow, Users, ShieldCheck, Clock, Ticket, Cursor, SignOut, ChartBar } from "phosphor-react";
import './Layout.css'


export default function Layout() {
  const location = useLocation();
  const { deviceId } = useParams();
  // Map paths to readable component names
  // const componentNames = {
  //   '/device-list': 'Device Inventory',
  //   '/device-crud': 'Device Inventory',
  //   '/devices/:device-id/installed': 'Device Inventory',

  //   '/software-list': 'Software Catalog',
  //   '/software-crud': 'Software Catalog',
  //   '/software-details': 'Software Catalog',

  //   '/users-devices': 'User Management',
  //   '/user-profile': 'User Management',
  //   '/users-list': 'User Management',

  //   '/licenses': 'License Management',
  //   '/licenses/new': 'License Management',
  //   '/licenses/:id/edit': 'License Management',
  //   '/licenses/:id': 'License Management',

  //   '/entitlements': 'Entitlements & Seat Allocation',
  //   '/assign': 'Entitlements & Seat Allocation',

  //   '/installed': 'Installation Tracking & History',
  //   '/devices/:deviceId/installations': 'Installation Tracking & History',
  //   `/installed/:id/history`: 'Installation Tracking & History',
  // };

  // const currentComponent = componentNames[location.pathname] || 'Dashboard';

  const routeGroups = [
    { pattern: "/app/devices/management", name: "Device Inventory" },
    { pattern: "/app/devices", name: "Device Inventory" },

    { pattern: "/app/devices/:deviceId/installed", name: "Device Inventory" },

    { pattern: "/app/software-catalog", name: "Software Catalog" },
    { pattern: "/app/software-catalog/software-list", name: "Software Catalog" },
    { pattern: "/app/software-catalog/software-management", name: "Software Catalog" },
    { pattern: "/app/software-catalog/software-details", name: "Software Catalog" },

    { pattern: "/app/users-list", name: "User Management" },
    { pattern: "/app/user-profile", name: "User Management" },
    { pattern: "/app/users-devices", name: "User Management" },

    { pattern: "/app/licenses", name: "License Management" },
    { pattern: "/app/licenses/:id", name: "License Management" },

    { pattern: "/app/entitlements", name: "Entitlements & Seat Allocation" },

    { pattern: "/app/entitlements/assign", name: "Entitlements & Seat Allocation" },
    { pattern: "/app/installed", name: "Installation Tracking & History" },
    { pattern: "/app/installed/:id/history", name: "Installation Tracking & History" },
    { pattern: "/app/installed/:deviceId/installations", name: "Installation Tracking & History" },

{ pattern: "/app/dashboards/", name: "Dashboards" },
 { pattern: "/app/dashboards/finance-dashboard", name: "Dashboards" },
 { pattern: "/app/dashboards/user-dashboard", name: "Dashboards" },
 { pattern: "/app/dashboards/auditor-dashboard", name: "Dashboards" },


    //    '/installed': 'Installation Tracking & History',
    // '/devices/:deviceId/installations': 'Installation Tracking & History',
    // `/installed/:id/history`: 'Installation Tracking & History',
  ];

  const active = routeGroups.find((r) => matchPath(r.pattern, location.pathname));

  const currentComponent = active ? active.name : "Unknown Page";

  const linkStyle = ({ isActive }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
    width: '10rem',
    margin: '8px 0',
    padding: '8px',
    backgroundColor: isActive ? '#f1f1f1' : '',
    borderRadius: '20px',
    textDecoration: 'none',
    letterSpacing: '-0px',
    color: isActive ? 'rgb(26,27,27)' : 'grey',
    fontWeight: isActive ? '750' : '550',
    fontFamily: 'Inter, Arial, sans-serif',
    cursor: 'pointer'

  });

  const SignOutlinkStyle = ({ isActive }) => ({
    position: 'absolute',
    bottom: '1rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.4rem',
    width: '10rem',
    margin: '8px 0',
    padding: '8px',
    backgroundColor: isActive ? '#f1f1f1' : '',
    borderRadius: '20px',
    textDecoration: 'none',
    letterSpacing: '-0px',
    color: isActive ? 'rgb(26,27,27)' : 'grey',
    fontWeight: isActive ? '750' : '550',
    fontFamily: 'Inter, Arial, sans-serif',
    cursor: 'pointer'

  });

  return (
    <div style={{ display: 'flex', height: '100vh', width: '220px', borderRight: '1px solid rgba(219, 219, 219, 1)', }}>
      {/* Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1.24rem', alignItems: 'center' }}>
        <div className='encora-logo'>
          encora
        </div>
        <div style={{ marginTop: '4rem', background: '#ffffff', padding: '1.2rem', fontFamily: 'Inter, Arial, sans-serif' }}>
          <NavLink to="/app/devices" end={false} style={linkStyle}>
            <Monitor size={24} />
            <span>Device Inventory
            </span>
          </NavLink>
          <NavLink to="/app/software-catalog" end={false} style={linkStyle}><AppWindow size={24} />
            <span>
              Software Catalog
            </span>
          </NavLink>
          <NavLink to="/app/users-list" style={linkStyle}> <Users size={24} />
            <span>
              User Management
            </span></NavLink>
          <NavLink to="/app/licenses" style={linkStyle}> <ShieldCheck size={24} />
            <span>
              License Management
            </span></NavLink>
          <NavLink to="/app/entitlements" style={linkStyle}><Ticket size={36} />
            <span>
              Entitlement & Seat Allocation
            </span>
          </NavLink>
           <NavLink to="/app/dashboards/" end={false} style={linkStyle}>
            <ChartBar size={24} />
            <span>
              Dashboards
            </span>
          </NavLink>
          {/* <NavLink to="/installed" style={linkStyle}><Clock size={32} />
            <span>
              Installation Tracking & History
            </span></NavLink> */}
          <NavLink to="/" style={SignOutlinkStyle}>
            <SignOut size={24} />
            <span>
              Sign Out
            </span>
          </NavLink>

         

        </div>

      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flexDirection: 'column', }}>
        {/* Top Navbar */}
        <div>

          {currentComponent === "Device Inventory" ?
            <div className='nav-container'>
              <div className='nav-title'>
                {currentComponent}
              </div>
              <div className='nav-links'>
                <NavLink to="/app/devices" end={false} className='nav-link'>Device List</NavLink>
                <NavLink to="/app/devices/management" end={false} className='nav-link'>Device Management</NavLink>
                {/*  <NavLink to="/devices/installed" className='nav-link'>Installed Softwares</NavLink>*/}
              </div>
            </div>
            : null}


          {currentComponent === "Software Catalog" ?
            <div className='nav-container'>
              <div className='nav-title'>
                {currentComponent}
              </div>
              <div className='nav-links'>
                <NavLink to="/app/software-catalog/software-list" className='nav-link'>Software List</NavLink>
                <NavLink to="/app/software-catalog/software-management" className='nav-link'>Software Management</NavLink>
                <NavLink to="/app/software-catalog/software-details" className='nav-link'>Software Details</NavLink>
              </div>
            </div>
            : null}


          {currentComponent === "User Management" ?
            <div className='nav-container'>
              <div className='nav-title'>
                {currentComponent}
              </div>
              <div className='nav-links'>
                <NavLink to="/app/users-list" className='nav-link'>Users</NavLink>
                {/* <NavLink to="/device-list" className='nav-link'>User Devices</NavLink> */}
                {/* <NavLink to="/user-profile" className='nav-link'>User Profiles</NavLink> */}
              </div>
            </div>
            : null}


          {currentComponent === "License Management" ?
            <div className='nav-container'>
              <div className='nav-title'>
                {currentComponent}
              </div>
              <div className='nav-links'>
                <NavLink to="/app/licenses" className='nav-link'>License List</NavLink>
                <NavLink to="/app/licenses/new" className='nav-link'>New License</NavLink>

              </div>
            </div>
            : null}


          {currentComponent === "Entitlements & Seat Allocation" ?
            <div className='nav-container'>
              <div className='nav-title'>
                {currentComponent}
              </div>
              <div className='nav-links'>
                <NavLink to="/app/entitlements" className='nav-link'>Entitlments List</NavLink>
                <NavLink to="/app/entitlements/assign" className='nav-link'>Assign License</NavLink>

              </div>
            </div>
            : null}


            {currentComponent === "Dashboards" ?
            <div className='nav-container'>
              <div className='nav-title'>
                {currentComponent}
              </div>
              <div className='nav-links'>
                <NavLink to="/app/dashboards/" className='nav-link'>It-Dashboard</NavLink>
                <NavLink to="/app/dashboards/finance-dashboard" className='nav-link'>Finance-Dashboard</NavLink>
                <NavLink to="/app/dashboards/user-dashboard" className='nav-link'>User-Dashboard</NavLink>
                 <NavLink to="/app/dashboards/auditor-dashboard" className='nav-link'>Auditor-Dashboard</NavLink>
              </div>
            </div>
            : null}


          {currentComponent === "Installation Tracking & History" ?
            <div className='nav-container'>
              <div className='nav-title'>
                {currentComponent}
              </div>
              <div className='nav-links'>
                <NavLink to="/app/installed" className='nav-link'>Installed Software List</NavLink>
                <NavLink to="/app/devices/:deviceId/installations" className='nav-link'>by Device ID</NavLink>
                <NavLink to="/app/installed/:id/history" className='nav-link'>by Device ID History</NavLink>
              </div>
            </div>
            : null}



        </div>


        {/* Component Outlet */}
        <div style={{ width: '82vw', overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div >
  );
}
