import React, { useEffect, useState } from 'react';
import { Nav, Offcanvas } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaChartLine, FaHistory } from 'react-icons/fa';

const Sidebar = ({ show, onHide }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeStyle = {
    backgroundColor: '#444c56',
    borderRadius: '0.375rem'
  };

  const iconStyle = { color: '#ff971d' };
  const linkTextStyle = { color: '#ffffff' };

  const renderLink = (to, icon, label, end = false) => (
    <Nav.Link
      as={NavLink}
      to={to}
      end={end}
      style={({ isActive }) => (isActive ? activeStyle : undefined)}
      className="px-3 py-2 nav-link"
      onClick={onHide}
    >
      {React.cloneElement(icon, { className: 'me-2', style: iconStyle })}
      <span style={linkTextStyle}>{label}</span>
    </Nav.Link>
  );

  return isMobile ? (
    <Offcanvas show={show} onHide={onHide} responsive="md" style={{ backgroundColor: '#020716', color: '#ff971d' }}>
      <Offcanvas.Header closeButton closeVariant="white">
        <Offcanvas.Title>CryptoTrack</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column gap-2">
          {renderLink('/dashboard', <FaChartLine style={{ color: '#ffffff !important' }}/>, 'Current Coins', true)}
          {renderLink('/dashboard/history', <FaHistory style={{ color: '#ffffff !important' }}/>, 'History')}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  ) : (
    <div
      className="d-none d-md-flex flex-column p-3"
      style={{ width: '220px', minHeight: '100vh', backgroundColor: '#000411', color: '#ff971d' }}
    >
      <Nav className="flex-column gap-2">
        {renderLink('/dashboard', <FaChartLine style={{ color: '#ffffff !important' }}/>, 'Current Coins', true)}
        {renderLink('/dashboard/history', <FaHistory style={{ color: '#ffffff !important' }}/>, 'History')}
      </Nav>
    </div>
  );
};

export default Sidebar;
