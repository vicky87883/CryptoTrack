import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FaBars, FaBell, FaCog, FaSyncAlt } from 'react-icons/fa';

const Header = ({ onToggleSidebar }) => {
  const [isRotating, setIsRotating] = useState(false);

  // Timer function for auto-refresh every 30 minutes
  const handleAutoRefresh = () => {
    window.location.reload(); // This will reload the page
  };

  // Setting the timer for auto-refresh every 30 minutes (30 * 60 * 1000 ms)
  useEffect(() => {
    // Start the rotation and refresh timer when component mounts
    setIsRotating(true);

    const interval = setInterval(() => {
      handleAutoRefresh();
    }, 1800000); // 30 minutes in milliseconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Navbar expand="md" className="shadow-sm px-3 px-md-4 navyblue header-shadow">
      <Container fluid className="justify-content-between">
        {/* Sidebar Toggle for Mobile */}
        <Button
          variant="outline-dark"
          className="d-md-none"
          onClick={onToggleSidebar}
          style={{ color: "#ff971d",border:"1px solid #ff971d" }}
        >
          <FaBars/>
        </Button>

        {/* Title (hidden on mobile) */}
        <Navbar.Brand className="fw-bold d-none d-md-block text-white">
          <span style={{ color: "#ff971d" }}>Crypto</span>Track
        </Navbar.Brand>

        {/* Auto-refresh button with text and icon */}
        

        {/* Right Side Icons */}
        <div className="d-flex align-items-center gap-3">
          <Button 
          variant="outline-light" 
          style={{ color: '#ff971d', borderColor: '#ff971d', borderRadius: '5px', fontSize: '14px' }}
          className="d-flex align-items-center gap-2"
        >
          {/* Apply rotation only to the icon */}
          <FaSyncAlt size={16} className={isRotating ? 'rotate-icon' : ''} />
          <span>Auto Refresh</span>
        </Button>
          <FaBell size={20} style={{ color: "#ff971d" }} />
          <FaCog size={20} style={{ color: "#ff971d" }} />
          {/* Image Icon */}
          <img
            src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"  // Placeholder image
            alt="profile"
            style={{ width: 30, height: 30, borderRadius: '50%' }}
          />
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
