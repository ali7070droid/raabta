import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex' }}>
        <li style={{ marginRight: '15px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>Contacts</Link>
        </li>
        <li style={{ marginRight: '15px' }}>
            Interactions
        </li>
        <li style={{ marginRight: '15px' }}>
            Reports
        </li>
        {/* Add more nav items here as needed */}
      </ul>
    </nav>
  );
};

export default NavBar;
