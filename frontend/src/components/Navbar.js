import React from 'react';
import { NavLink } from 'react-router-dom';
import './estilosComponentes/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <NavLink to="/" className="nav-button" title="Inicio">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="nav-icon">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinejoin="round" strokeLinecap="round"></path>
        </svg>
      </NavLink>
      <NavLink to="/chat" className="nav-button" title="Chat">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="nav-icon">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 11.9z" strokeLinejoin="round" strokeLinecap="round"></path>
        </svg>
      </NavLink>
      <NavLink to="/usuarios" className="nav-button" title="Usuarios">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="nav-icon">
          <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" strokeLinejoin="round" strokeLinecap="round"></path>
        </svg>
      </NavLink>
      <NavLink to="/cargar-pdf" className="nav-button" title="Documentación">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="nav-icon">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinejoin="round" strokeLinecap="round"></path>
        </svg>
      </NavLink>
    </nav>
  );
};

export default Navbar;
