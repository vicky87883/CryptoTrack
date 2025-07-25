// src/components/Header.js
import React, { useState } from 'react';
import { Navbar, Container, Button, Dropdown } from 'react-bootstrap';
import { FaBars, FaBell, FaCog, FaSyncAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Header = ({ onToggleSidebar }) => {
  const [isRotating, setIsRotating] = useState(true);
  const { user, logout } = useAuth();

  return (
    <Navbar expand="md" className="shadow-sm px-3 px-md-4 navyblue header-shadow">
      <Container fluid className="justify-content-between">
        <Button
          variant="outline-dark"
          className="d-md-none"
          onClick={onToggleSidebar}
          style={{ color: "#ff971d", border: "1px solid #ff971d" }}
        >
          <FaBars />
        </Button>

        <Navbar.Brand className="fw-bold d-none d-md-block text-white">
          <span style={{ color: "#ff971d" }}>Crypto</span>Track
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-3">
          <Button
            variant="outline-light"
            style={{ color: '#ff971d', borderColor: '#ff971d', borderRadius: '5px', fontSize: '14px' }}
            className="d-flex align-items-center gap-2"
          >
            <FaSyncAlt size={16} className={isRotating ? 'rotate-icon' : ''} />
            <span>Auto Refresh</span>
          </Button>
          <FaBell size={20} style={{ color: "#ff971d" }} />
          <FaCog size={20} style={{ color: "#ff971d" }} />

          {/* Dropdown Profile */}
          <Dropdown align="end">
            <Dropdown.Toggle as="div" id="dropdown-custom-components">
              <img
                src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                alt="profile"
                style={{ width: 30, height: 30, borderRadius: '50%', cursor: 'pointer' }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>Hello, {user?.username || 'User'}</Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;