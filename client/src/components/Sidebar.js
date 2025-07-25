import React, { useEffect, useState } from 'react';
import { Nav, Offcanvas } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaChartLine, FaHistory } from 'react-icons/fa';

const Sidebar = ({ show, onHide }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItemClass = (path) =>
    `text-white nav-link px-3 py-2 rounded ${location.pathname === path ? 'bg-secondary' : ''}`;

  return isMobile ? (
    <Offcanvas show={show} onHide={onHide} responsive="md" style={{ backgroundColor: '#020716', color: '#ff971d' }}>
      <Offcanvas.Header closeButton closeVariant="white">
        <Offcanvas.Title>CryptoTrack</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column gap-2">
          <Nav.Link as={Link} to="/" onClick={onHide} className={navItemClass('/')} >
            <FaChartLine className="me-2" style={{color:'#ff971d'}}/>
            Current Coins
          </Nav.Link>
          <Nav.Link as={Link} to="/history" onClick={onHide} className={navItemClass('/history')}>
            <FaHistory className="me-2" style={{color:'#ff971d'}}/>
            History
          </Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  ) : (
    <div
      className="d-none d-md-flex flex-column p-3"
      style={{ width: '220px', minHeight: '100vh',backgroundColor: '#000411',color:'#ff971d' }}
    >
      {/* <h4 className="text-white mb-4">CryptoTrack</h4> */}
      <Nav className="flex-column gap-2">
        <Nav.Link as={Link} to="/" className={navItemClass('/')} >
          <FaChartLine className="me-2" style={{color:'#ff971d'}}/>
          Current Coins
        </Nav.Link>
        <Nav.Link as={Link} to="/history" className={navItemClass('/history')}>
          <FaHistory className="me-2" style={{color:'#ff971d'}}/>
          History
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
