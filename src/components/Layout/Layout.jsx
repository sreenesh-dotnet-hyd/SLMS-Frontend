import { Outlet, NavLink, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  // Map paths to readable component names
  const componentNames = {
    '/device-list': 'Device List',
    '/device-crud': 'Device CRUD',
    '/installed-softwares': 'Installed Softwares',
    '/software-list': 'Software List',
    '/software-crud': 'Software CRUD',
    '/software-details': 'Software Details',
  };

  const currentComponent = componentNames[location.pathname] || 'Dashboard';

  const linkStyle = ({ isActive }) => ({
    display: 'block',
    margin: '8px 0',
    padding: '8px',
    borderRadius: '4px',
    textDecoration: 'none',
    color: isActive ? '#1976d2' : '#000',
    background: isActive ? '#e0e0e0' : 'transparent',
    fontWeight: isActive ? '750' : 'normal',
     fontFamily: 'Inter, Arial, sans-serif'
  });

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '220px', background: '#f0f0f0', padding: '20px',  fontFamily: 'Inter, Arial, sans-serif' }}>
        <h3>Modules</h3>
        <NavLink to="/device-list" style={linkStyle}>Device Inventory</NavLink>
        <NavLink to="/software-list" style={linkStyle}>Software Catalog</NavLink>

        <h4 style={{ marginTop: '20px' }}>Components</h4>
        {/* Device Components */}
        <NavLink to="/device-list" style={linkStyle}>Device List</NavLink>
        <NavLink to="/device-crud" style={linkStyle}>Device CRUD</NavLink>
        <NavLink to="/installed-softwares" style={linkStyle}>Installed Softwares</NavLink>

        {/* Software Components */}
        <NavLink to="/software-list" style={linkStyle}>Software List</NavLink>
        <NavLink to="/software-crud" style={linkStyle}>Software CRUD</NavLink>
        <NavLink to="/software-details" style={linkStyle}>Software Details</NavLink>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar */}
        <div style={{ background: '#1976d2', color: '#fff', padding: '10px 20px' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Enterprise SLMS</span>
          <span style={{ marginLeft: '20px' }}>| Current Component: {currentComponent}</span>
        </div>

        {/* Component Outlet */}
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
