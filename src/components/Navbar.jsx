import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{
    backgroundColor: '#3b4cca',
    padding: '10px 20px',
    color: 'white',
    marginBottom: 20
  }}>
    <Link to="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: 24 }}>
      PokeDex Pro
    </Link>
  </nav>
);

export default Navbar;
